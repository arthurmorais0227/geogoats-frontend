'use client';

import { entrar } from '@/actions/login';
import { Alert, Button, Card, Form, Input } from 'antd';
import { useState } from 'react';

export default function Login() {
    const [erro, setErro] = useState('');

    return (
        <Card title="GeoGoats - Login" style={{ maxWidth: 400, margin: '80px auto' }}>
            <Form
                layout="vertical"
                onFinish={async (dados) => {
                    const resposta = await entrar(dados);
                    setErro(resposta?.erro ?? '');
                }}>
                {erro && <Form.Item><Alert type="error" message={erro} /></Form.Item>}

                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="senha" label="Senha" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>Entrar</Button>
            </Form>
        </Card>
    );
}