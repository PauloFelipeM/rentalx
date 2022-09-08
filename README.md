# Cadastro de carro

**Requisitos funcionais (RF)**
- Deve ser possível listar todas as categorias.
- Deve ser possível cadastrar um novo carro.

**Regra de negócio (RN)**
- Não deve ser possível cadastrar um carro com uma plaja já existente.
- Não deve ser possível alterar a placa de um carro.
- Não deve ser possível cadastrar um carro sem categoria.
- O carro deve ser cadastrado como disponível por padrão.
- Somente usuários administradores podem cadastrar um carro.

# Listagem de carros

**Requisitos funcionais (RF)**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de negócio (RN)**
- O usuário não precisa está logado no sistema.

# Cadastro de especificação do carro

**Requisitos funcionais (RF)**
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todas todos os carros.
- Deve ser possível cadastrar uma especificação para um carro.

**Regra de negócio (RN)**
- Não deve ser possível cadastrar uma especificação para um carro que não existe.
- Não deve ser possível cadastrar a mesma especificação para um carro.
- Somente usuários administradores podem cadastrar um carro.

# Cadastro de imagens do carro

**Requisitos funcionais (RF)**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**Requisitos não funcionais (RNF)**
- Utilizar o multer para upload dos arquivos.

**Regra de negócio (RN)**
- Deve ser possível cadastrar mais de uma imagem para o carro.
- Somente usuários administradores podem cadastrar um carro.

# Aluguel de carro

**Requisitos funcionais (RF)**
- Deve ser possível cadastrar um aluguel.

**Regra de negócio (RN)**
- O Aluguel deve ter duração mínima de 1 dia.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro