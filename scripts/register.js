"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('enviar');
    if (!registerForm) {
        console.error('Botão de enviar não encontrado!');
        return;
    }
    registerForm.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        e.preventDefault();
        const name = (_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.value;
        const username = (_b = document.getElementById('user')) === null || _b === void 0 ? void 0 : _b.value;
        const password = (_c = document.getElementById('senha')) === null || _c === void 0 ? void 0 : _c.value;
        if (!name || !username || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        try {
            // Primeiro, lê o arquivo users.json existente
            const response = yield fetch('./users.json');
            let users = {};
            if (response.ok) {
                users = yield response.json();
            }
            // Verifica se o usuário já existe
            if (users[username]) {
                alert('Este nome de usuário já está em uso!');
                return;
            }
            // Adiciona o novo usuário
            users[username] = {
                name,
                username,
                password
            };
            // Salva o arquivo atualizado
            const saveResponse = yield fetch('./users.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(users)
            });
            if (!saveResponse.ok) {
                throw new Error('Erro ao salvar usuário');
            }
            alert('Usuário registrado com sucesso!');
            window.location.href = './login.html';
        }
        catch (error) {
            console.error('Erro ao registrar:', error);
            alert('Erro ao registrar usuário. Tente novamente.');
        }
    }));
});
