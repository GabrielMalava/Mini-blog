# MiniBlog 📝

Uma plataforma moderna de blog construída com React e Firebase, oferecendo uma experiência rica de compartilhamento de conteúdo.

## ✨ Funcionalidades

### 📱 Para Usuários

- **Sistema de Autenticação**
  - Registro de conta
  - Login/Logout
  - Dashboard personalizado

### 📝 Gerenciamento de Posts

- Criação de posts com suporte a:
  - Múltiplas imagens (carrossel)
  - Tags personalizadas
  - Formatação de texto
  - Tempo estimado de leitura (calculado automaticamente)

### ❤️ Interação

- **Sistema de Favoritos**

  - Marcar/desmarcar posts como favoritos
  - Página dedicada para posts favoritos
  - Persistência local dos favoritos

- **Sistema de Avaliação**
  - Avaliação em estrelas (1-5)
  - Persistência local das avaliações

### 🔍 Busca e Filtros

- **Filtros Avançados**
  - Filtrar por tags
  - Filtrar por data (hoje, semana, mês, ano)
  - Filtrar por autor
  - Busca por palavras-chave

### 🎨 Interface

- Design responsivo
- Layout em grid moderno
- Carrossel de imagens
- Barra lateral de filtros
- Compartilhamento de posts

## 🚀 Tecnologias Utilizadas

- **React** - Framework principal
- **Firebase** - Backend e autenticação
- **CSS Modules** - Estilização
- **Context API** - Gerenciamento de estado
- **Custom Hooks** - Lógica reutilizável
- **Swiper** - Carrossel de imagens

## 📦 Instalação e Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

## 🔧 Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative o Authentication com email/senha
3. Configure o Firestore Database
4. Adicione suas credenciais no arquivo de configuração:

```javascript
// src/firebase/config.js
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  storageBucket: "seu-storage-bucket",
  messagingSenderId: "seu-messaging-sender-id",
  appId: "seu-app-id",
};
```

## 📱 Uso

1. **Criar uma conta**

   - Acesse a página de registro
   - Preencha suas informações
   - Faça login

2. **Criar Posts**

   - Acesse "Criar Post"
   - Adicione título, conteúdo e imagens
   - Use vírgulas para separar tags
   - Use vírgulas para adicionar múltiplas imagens

3. **Interagir com Posts**
   - Favorite posts interessantes
   - Avalie posts com estrelas
   - Use filtros para encontrar conteúdo
   - Compartilhe posts com amigos

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nossas diretrizes de contribuição para começar.

## 📄 Licença

Este projeto está sob a licença MIT.
