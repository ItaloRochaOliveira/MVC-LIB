# MVC-LIB

mvc lib é uma biblioteca que ajuda os desenvolvedores a diminuir as linhas de código e ajudar a desenvolver com mais facilidade. A biblioteca ORM utilizado como base é a Sequelize.
Ao instanciar qualquer classe do mvc-lib você terá acesso a quatro métodos: getAll, getOne, create, edite. Todas elas possuem validação e precisam ser passados suas tipagens.

### Manual de uso 

```Adicionando o Sequelizer:
import {DataBaseBuilder} from "MVC-LIB";

const sequelize = new DataBaseBuilder<typeOfDb>(username, password, database, host, port, dialect).getSequelizer();
```
```Adicionando o repositorio.
import {RepositoryBuilder} from "MVC-LIB";

const repository = new Repository<DbSequelizeModel>(sequelize, dbModel);
```
```Adicionando o repositorio com tabela externa.
import {RepositoryWithForeignBuilder} from "MVC-LIB";

const repository = new RepositoryWithForeignBuilder<DbSequelizeModel, DbSequelizeModelWithForeign>(sequelize, dbModel);
```
```Adicionando o service.
import {ServiceBuilder} from "MVC-LIB";

const service = new ServiceBuilder<RepositoryModel>(repository);
```
```Adicionando o controller.
import {ControllerBuilder} from "MVC-LIB";

const controller = new ControllerBuilder<ServieModel>(service);

// caso o controller use middleware de error, terá que passar:
controller.errorMiddlewareFunction(true);
```