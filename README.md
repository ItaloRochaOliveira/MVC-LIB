# MVC-LIB

MVC-LIB is a library that helps developers reduce lines of code and simplify development. The ORM library used as the base is Sequelize. When instantiating any class from MVC-LIB, you will have access to four methods: getAll, getOne, create, and edit. All of these methods include validation and require type definitions.

###Usage Manual


Adding Sequelize:

```
import { DataBaseBuilder } from "MVC-LIB";

const sequelize = new DataBaseBuilder<typeOfDb>(username, password, database, host, port, dialect).getSequelizer();

```

Adding the repository:
```

import { RepositoryBuilder } from "MVC-LIB";

const repository = new Repository<DbSequelizeModel>(sequelize, dbModel);
```

Adding the repository with a foreign table:

```
import { RepositoryWithForeignBuilder } from "MVC-LIB";

const repository = new RepositoryWithForeignBuilder<DbSequelizeModel, DbSequelizeModelWithForeign>(sequelize, dbModel);
```

Adding the service:

```
import { ServiceBuilder } from "MVC-LIB";

const service = new ServiceBuilder<RepositoryModel>(repository);
```

Adding the controller:

```
import { ControllerBuilder } from "MVC-LIB";

const controller = new ControllerBuilder<ServiceModel>(service);

// if the controller uses error middleware, you will need to pass:
controller.errorMiddlewareFunction(true);
```
