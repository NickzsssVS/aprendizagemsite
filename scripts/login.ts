interface User {
    username: string;
    password: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('enviar') as HTMLButtonElement;
    
    if (!loginForm) {
        console.error('Botão de enviar não encontrado!');
        return;
    }
    
    loginForm.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const username = (document.getElementById('user') as HTMLInputElement)?.value;
        const password = (document.getElementById('senha') as HTMLInputElement)?.value;
        
        if (!username || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        try {
            const response = await fetch('./users.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar dados');
            }
            const users: { [key: string]: User } = await response.json();
            
            const user = users[username];
            
            if (user && user.password === password) {
                localStorage.setItem('loggedUser', username);
                window.location.href = './index.html';
            } else {
                alert('Usuário ou senha incorretos!');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Tente novamente.');
        }
    });
});