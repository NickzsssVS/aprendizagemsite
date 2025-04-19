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
    const loginForm = document.getElementById('enviar');
    if (!loginForm) {
        console.error('Botão de enviar não encontrado!');
        return;
    }
    loginForm.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        const username = (_a = document.getElementById('user')) === null || _a === void 0 ? void 0 : _a.value;
        const password = (_b = document.getElementById('senha')) === null || _b === void 0 ? void 0 : _b.value;
        if (!username || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        try {
            const response = yield fetch('./users.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar dados');
            }
            const users = yield response.json();
            const user = users[username];
            if (user && user.password === password) {
                localStorage.setItem('loggedUser', username);
                window.location.href = './index.html';
            }
            else {
                alert('Usuário ou senha incorretos!');
            }
        }
        catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Tente novamente.');
        }
    }));
});
