'use client';

import { Button, ConfigProvider, Form, Input, Modal, Popconfirm, Table } from 'antd';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { criarNoticia, editarNoticia, excluirNoticia } from '@/actions/noticias';
import styles from './PainelNoticias.module.css';

// "2026-11-27T12:00:00.000Z" → "2026-11-27" (formato do <input type="date">)
const paraInputData = (iso) => new Date(iso).toLocaleDateString('sv-SE');
const paraTexto = (iso) => new Date(iso).toLocaleDateString('pt-BR');
const hoje = () => new Date().toLocaleDateString('sv-SE');

// mesmas regras do backend, para avisar antes de enviar
const regras = {
    titulo: [
        { required: true, whitespace: true, message: 'Informe o título.' },
        { max: 200, message: 'Máximo de 200 caracteres.' },
    ],
    resumo: [
        { required: true, whitespace: true, message: 'Informe o resumo.' },
        { max: 255, message: 'Máximo de 255 caracteres.' },
    ],
    conteudo: [{ required: true, whitespace: true, message: 'Informe o conteúdo completo.' }],
    dataPublicacao: [{ required: true, message: 'Informe a data de publicação.' }],
    urlImagem: [
        { required: true, whitespace: true, message: 'Informe a URL da imagem.' },
        { max: 500, message: 'Máximo de 500 caracteres.' },
        {
            pattern: /^https?:\/\/\S+$/i,
            message: 'Use uma URL completa, começando com http:// ou https://.',
        },
    ],
};

export default function PainelNoticias({ noticias }) {
    const router = useRouter();
    const [form] = Form.useForm();
    const [busca, setBusca] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [editando, setEditando] = useState(null); // null = nova notícia
    const [visualizando, setVisualizando] = useState(null);
    const [salvando, setSalvando] = useState(false);
    const [excluindoId, setExcluindoId] = useState(null);

    const urlPreview = Form.useWatch('urlImagem', form);
    const urlValida = /^https?:\/\/\S+$/i.test(urlPreview ?? '');

    const filtradas = noticias.filter((n) =>
        n.titulo.toLowerCase().includes(busca.trim().toLowerCase()),
    );

    function abrirNova() {
        setEditando(null);
        form.resetFields();
        form.setFieldsValue({ dataPublicacao: hoje() });
        setModalAberto(true);
    }

    function abrirEdicao(noticia) {
        setEditando(noticia);
        form.setFieldsValue({
            titulo: noticia.titulo,
            resumo: noticia.resumo,
            conteudo: noticia.conteudo,
            urlImagem: noticia.urlImagem ?? '',
            dataPublicacao: paraInputData(noticia.dataPublicacao),
        });
        setModalAberto(true);
    }

    async function salvar(valores) {
        setSalvando(true);

        // meio-dia evita a data "voltar um dia" por causa do fuso horário
        const dados = { ...valores, dataPublicacao: `${valores.dataPublicacao}T12:00:00` };
        const resp = editando
            ? await editarNoticia(editando.id, dados)
            : await criarNoticia(dados);

        setSalvando(false);

        if (!resp.ok) {
            toast.error(resp.erro);
            return;
        }

        toast.success(resp.mensagem);
        setModalAberto(false);
        router.refresh();
    }

    async function excluir(noticia) {
        setExcluindoId(noticia.id);
        const resp = await excluirNoticia(noticia.id);
        setExcluindoId(null);

        if (!resp.ok) {
            toast.error(resp.erro);
            return;
        }

        toast.success(resp.mensagem);
        router.refresh();
    }

    const colunas = [
        {
            title: 'Imagem',
            dataIndex: 'urlImagem',
            width: 96,
            render: (url) =>
                url ? (
                    <Image src={url} alt="" width={72} height={48} unoptimized className={styles.miniatura} />
                ) : (
                    <span className={styles.semImagem}>—</span>
                ),
        },
        {
            title: 'Título',
            dataIndex: 'titulo',
            render: (titulo, noticia) => (
                <div>
                    <strong className={styles.tituloTabela}>{titulo}</strong>
                    <p className={styles.resumoTabela}>{noticia.resumo}</p>
                </div>
            ),
        },
        {
            title: 'Publicação',
            dataIndex: 'dataPublicacao',
            width: 130,
            render: paraTexto,
            sorter: (a, b) => new Date(a.dataPublicacao) - new Date(b.dataPublicacao),
            defaultSortOrder: 'descend',
        },
        {
            title: 'Ações',
            key: 'acoes',
            width: 150,
            render: (_, noticia) => (
                <div className={styles.acoes}>
                    <Button
                        type="text"
                        icon={<Eye size={17} />}
                        aria-label={`Ver "${noticia.titulo}"`}
                        onClick={() => setVisualizando(noticia)}
                    />
                    <Button
                        type="text"
                        icon={<Pencil size={17} />}
                        aria-label={`Editar "${noticia.titulo}"`}
                        onClick={() => abrirEdicao(noticia)}
                    />
                    <Popconfirm
                        title="Excluir notícia"
                        description="Essa ação não pode ser desfeita."
                        okText="Excluir"
                        cancelText="Cancelar"
                        okButtonProps={{ danger: true }}
                        onConfirm={() => excluir(noticia)}
                    >
                        <Button
                            type="text"
                            danger
                            loading={excluindoId === noticia.id}
                            icon={<Trash2 size={17} />}
                            aria-label={`Excluir "${noticia.titulo}"`}
                        />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4a7d5c',
                    colorText: '#34503e',
                    colorTextHeading: '#4a7d5c',
                    colorBorder: '#c7dfbf',
                    colorBorderSecondary: '#dcecd5',
                    colorBgContainer: '#f7fdf4',
                    borderRadius: 10,
                },
                components: {
                    Table: {
                        headerBg: '#d9f3d0',
                        headerColor: '#4a7d5c',
                        rowHoverBg: '#eefbe9',
                    },
                },
            }}
        >
            <div className={styles.barra}>
                <Input
                    allowClear
                    prefix={<Search size={16} />}
                    placeholder="Buscar pelo título"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className={styles.busca}
                />
                <Button type="primary" icon={<Plus size={16} />} onClick={abrirNova}>
                    Nova notícia
                </Button>
            </div>

            <Table
                rowKey="id"
                columns={colunas}
                dataSource={filtradas}
                pagination={{ pageSize: 8, hideOnSinglePage: true }}
                scroll={{ x: 640 }}
                locale={{ emptyText: 'Nenhuma notícia encontrada.' }}
                className={styles.tabela}
            />

            {/* CREATE / UPDATE */}
            <Modal
                title={editando ? 'Editar notícia' : 'Nova notícia'}
                open={modalAberto}
                onCancel={() => setModalAberto(false)}
                okText={editando ? 'Salvar alterações' : 'Cadastrar'}
                cancelText="Cancelar"
                confirmLoading={salvando}
                onOk={() => form.submit()}
                width={720}
                forceRender
            >
                <Form form={form} layout="vertical" onFinish={salvar} requiredMark={false}>
                    <Form.Item name="titulo" label="Título" rules={regras.titulo}>
                        <Input showCount maxLength={200} />
                    </Form.Item>

                    <Form.Item name="resumo" label="Resumo" rules={regras.resumo}>
                        <Input.TextArea showCount maxLength={255} autoSize={{ minRows: 2, maxRows: 4 }} />
                    </Form.Item>

                    <Form.Item name="conteudo" label="Conteúdo completo" rules={regras.conteudo}>
                        <Input.TextArea autoSize={{ minRows: 6, maxRows: 14 }} />
                    </Form.Item>

                    <div className={styles.linhaForm}>
                        <Form.Item
                            name="dataPublicacao"
                            label="Data de publicação"
                            rules={regras.dataPublicacao}
                            className={styles.campoData}
                        >
                            <Input type="date" />
                        </Form.Item>

                        <Form.Item
                            name="urlImagem"
                            label="URL da imagem"
                            rules={regras.urlImagem}
                            className={styles.campoUrl}
                        >
                            <Input placeholder="https://..." />
                        </Form.Item>
                    </div>

                    {urlValida && (
                        <Image
                            src={urlPreview}
                            alt="Prévia da imagem"
                            width={640}
                            height={360}
                            unoptimized
                            className={styles.previa}
                        />
                    )}
                </Form>
            </Modal>

            {/* READ (detalhe) */}
            <Modal
                title={visualizando?.titulo}
                open={!!visualizando}
                onCancel={() => setVisualizando(null)}
                footer={null}
                width={720}
            >
                {visualizando && (
                    <article className={styles.detalhe}>
                        <span className={styles.data}>
                            Publicada em {paraTexto(visualizando.dataPublicacao)}
                        </span>
                        {visualizando.urlImagem && (
                            <Image
                                src={visualizando.urlImagem}
                                alt=""
                                width={720}
                                height={405}
                                unoptimized
                                className={styles.previa}
                            />
                        )}
                        <p className={styles.resumo}>{visualizando.resumo}</p>
                        <p className={styles.texto}>{visualizando.conteudo}</p>
                    </article>
                )}
            </Modal>
        </ConfigProvider>
    );
}