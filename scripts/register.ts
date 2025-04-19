interface User {
    name: string;
    username: string;
    password: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('enviar') as HTMLButtonElement;
    
    if (!registerForm) {
        console.error('Botão de enviar não encontrado!');
        return;
    }
    
    registerForm.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const name = (document.getElementById('name') as HTMLInputElement)?.value;
        const username = (document.getElementById('user') as HTMLInputElement)?.value;
        const password = (document.getElementById('senha') as HTMLInputElement)?.value;
        
        if (!name || !username || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        try {
            // Lê usuários do servidor
            const response = await fetch('http://localhost:3000/users.json');
            let users: { [key: string]: User } = {};
            
            if (response.ok) {
                users = await response.json();
            }

            if (users[username]) {
                alert('Este nome de usuário já está em uso!');
                return;
            }

            users[name] = {
                name,
                username,
                password
            };

            // Salva no servidor
            const saveResponse = await fetch('http://localhost:3000/users.json', {
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
            
        } catch (error) {
            console.error('Erro ao registrar:', error);
            alert('Erro ao registrar usuário. Tente novamente.');
        }
    });
});