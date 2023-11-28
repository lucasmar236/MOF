# 🇧🇷 Documentação sobre arquitetura/organização da web

Esta parte do projeto consiste apenas na documentação da arquitetura/organização da aplicação na web, demonstrando como foram sepradas e montadas assim como o que cada pasta contém,os comandos para iniciar a aplicação podem ser encontrados no Readme geral da aplicação.

## :pushpin: O que é Clean Architecture

Clean Architecture tenta fornecer uma metodologia a ser usada na codificação, a fim de facilitar o desenvolvimento códigos, permitir uma melhor manutenção, atualização e menos dependências.Tem o objetivo de fornecer aos desenvolvedores uma maneira de organizar o código de forma que encapsule a lógica de negócios, mas mantenha-o separado do mecanismo de entrega.

## :open_file_folder: Organização a parte web

O projeto atualmente contém as seguintes pastas:

- [assets]();
- [data]();
- [domain]();
- [interface]();
- [router]();
- [service]();

Cada pasta possui uma responsabilidade dentro da aplicação e neste bloco irei detalhar um pouco melhor o que cada uma cóntem e quais são suas responsabilidades:

#### :framed_picture: Assets

A pasta Assets tem como responsabilidade guardar arquivos responsáveis por fontes,imagens e scss(na versão atual os scss estão separados e junto com o seu componente, durante a proxima refatoração será colocado dentro do assets para assim termos uma centralização melhor).
As pastas dentro do assets seguem o seguinte formato:
  - `imgs`: pasta que contém todas as imagens utilizadas no software;
  - `fonts`: pasta que contém todas as fonts utilizadas no software;
  - `scss`: pasta que contém todos os scss utilizadas no software e possuí subpastas com o nome do componente(assets/sccs/private/createAccountSccs);

#### :books: Data

A pasta Data tem como responsabilidade guardar arquivos responsáveis pelos dados da aplicação e implementação das regras de négocio que foram declaras no `Domain` além de possuir uma dependência com a mesma.

#### :card_index_dividers: Domain

A pasta Domain tem como responsabilidade guardar arquivos responsáveis pelas regras de négocio da aplicação e não contém dependência com nenhuma outra camada,as pastas dentro da Domains segue o seguinte formato:
  - `entities`: pasta que contém as entidades usadas dentro da aplicação com os seus respectivos metodos;
  - `repositories`: pasta que contém uma coleção das regras de negócio;
  - `usecases`: pasta que contém os casos de uso da regra de negócio;

#### :art: Interface

A pasta Interface tem como responsabilidade guardar arquivos responsáveis pelo visual da aplicação, as pastas dentro de Interface seguem o seguinte formato:
  - `components`: pasta que contém todos os componentes da aplicação e possui subpastas responsáveis pela organização desses componentes:
      - `/private`:pasta que contém os componentes que são usados uma ou duas vezes em toda a aplicação, possui subpastas com o nome do componente(interface/componentes/private/createAccount);
      - `/shared`: pasta que contém os componentes que são usados em toda a aplicação inúmeras vezes, possui subpastas com o nome do componente(interface/componentes/shared/footer);
  - `pages`: pasta que contém todos as páginas da aplicação e possui subpastas com o nome da tela(interface/componentes/pages/login);
  - `utils`: pasta que contém todas as funções reutilizavéis e layouts que a aplicação possui;
    
#### :compass: Router

A pasta Router tem como responsabilidade guardar arquivos responsáveis pela navegação dentro da aplicação(suas rotas públicas e privadas)

#### :hammer_and_wrench: Service

A pasta Service tem como responsabilidade guardar arquivos responsáveis pelos serviços consumidos dentro da aplicação (requisições HTTP, estados e ganchos),as pastas dentro de Service seguem o seguinte formato:
  - `htpp`: pasta que contém todos os metodos para realizar a conexão com a api e pode possui subpastas caso queira separar as rotas em pastas;
  - `redux`: pasta que contém todos os estados da aplicação e possui subpastas com o nome do componente(/service/redux/createAccount);

    
# 🇺🇸 Documentation about architecture and organization from web
