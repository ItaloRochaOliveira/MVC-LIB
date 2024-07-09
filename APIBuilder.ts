import { NextFunction, Request, Response } from "express";
import { Model, Sequelize, WhereOptions} from 'sequelize';
import { DbType } from "./APITypes/dbInterface";
import { DbModelType, UserModel } from "./APITypes/genericDbModelInterface";
import { dynamicJsonBuilder } from "./dynamicJsonBuilder";
import {RequestPagination} from "./APITypes/IPRequesteInterface";
import BadRequest from "./errors/BadRequest";


type Validator<T> = (value: any) => value is T;

class DataBaseBuilder<dbType extends DbType> {
    private sequelize: Sequelize;

    constructor(dbConfig: dbType){
        this.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            port: dbConfig.port,
            host: dbConfig.host,
            dialect: dbConfig.dialect,
            logging: false
        })
    }

    getSequelize(){
        return this.sequelize;
    }
}

class RepositoryBuilder<DbModel extends DbModelType = typeof UserModel >{
    constructor(protected sequelize: Sequelize, protected dbModel: DbModel){}
    protected dbModelInstantiated = this.dbModel.initModel(this.sequelize);

    async getAll<QueryModel = {id: string}>(query?: QueryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<DbModel[]>{
        const valuesExistQuery = dynamicJsonBuilder(query ? query : {});
        
        return await this.dbModelInstantiated.findAll({
            attributes: atributes?.length ? atributes : '',
            where: valuesExistQuery.json as WhereOptions,
            offset: pagination?.init,
            limit: pagination?.limit,
        }) as unknown as DbModel[];
    }

    async getOne<QueryModel = {id: string}>(query?: QueryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<DbModel>{
        const valuesExistQuery = dynamicJsonBuilder(query ? query : {});
        
        return await this.dbModelInstantiated.findOne({
            attributes: atributes?.length ? atributes : '',
            where: {valuesExistQuery} as WhereOptions,
            offset: pagination?.init,
            limit: pagination?.limit
        }) as unknown as DbModel;
    }

    async create<ValuesType = {username: string, email: string}>(values: ValuesType) {
        return await this.dbModelInstantiated.create(values);
    }

    async update<id = {id: number}, ValuesType = {username: string, email: string}>(id: id, values: ValuesType){
        return await this.dbModelInstantiated.update(values, {
            where: id
        })
    }

    // async delete<id= number>(id: id){
    //     return await this.dbModelInstantiated.delete()
    // }
}

class RepositoryWithForeignBuilder<DbModel extends DbModelType = typeof UserModel, DbModelWithForeignType extends DbModelType = typeof UserModel> extends RepositoryBuilder<DbModelType>{
    private dbModelInstantiatedForForeign: DbModel;
    
    constructor(sequelize: Sequelize, dbModel: DbModel, private foreignModel: DbModelWithForeignType, private foreignKey: string){
        super(sequelize, dbModel);
        this.dbModelInstantiatedForForeign = this.foreignModel.initModel(this.sequelize);
        this.dbModelInstantiated.belongsTo(this.dbModelInstantiatedForForeign, {foreignKey: this.foreignKey});
    }

    async getAll<QueryModel = {id: string}>(query?: QueryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<DbModel[]>{
        const valuesExistQuery = dynamicJsonBuilder(query ? query : {});
        
        return await this.dbModelInstantiated.findAll({
            attributes: atributes?.length ? atributes : '',
            where: valuesExistQuery.json as WhereOptions,
            offset: pagination?.init,
            limit: pagination?.limit,
            include: [{
                model: this.foreignModel
            }]
        }) as unknown as DbModel[];
    }

    async getOne<QueryModel = { id: string; }>(query?: QueryModel, atributes?: string[], pagination?: { init: number; limit: number; }): Promise<DbModelType> {
        const valuesExistQuery = dynamicJsonBuilder(query ? query : {});
        
        return await this.dbModelInstantiated.findOne({
            attributes: atributes?.length ? atributes : '',
            where: {valuesExistQuery} as WhereOptions,
            offset: pagination?.init,
            limit: pagination?.limit,
            include: [{
                model: this.foreignModel
            }]
        }) as unknown as DbModel;
    }
 
}

class ServiceBuilder <RepositoryModel extends RepositoryBuilder<DbModelType> = RepositoryBuilder<typeof UserModel>>{
    static validator:Validator<any>
    constructor(private repository: RepositoryModel){}
    async getAll<QueryModel>(query?: QueryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<any>{
        const valuesExist = await this.repository.getAll<QueryModel>(query, atributes, pagination);

        if(!valuesExist.length) throw new BadRequest();

        return valuesExist; 
    }

    async getOne<QueryModel = {id: string}>(query?: QueryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<any>{
        const valuesExist = await this.repository.getOne<QueryModel>(query, atributes, pagination);

        if(!valuesExist) throw new BadRequest();

        return valuesExist; 
    }

    async create<Values = {username: string, email: string}>(values: Values){
        for (const key in values) {
            if (!values[key]) {
                throw new BadRequest("O valor passado está vazio");
            }
        }
        
        const valuesCreated = await this.repository.create<Values>(values);

        return valuesCreated;
    }

    async update<id = {id: string}, Values = {username: string, email: string}> (id: id, values: Values){
        for (const key in values) {
            if (!values[key]) {
                throw new BadRequest("O valor passado está vazio");
            }
        }

        const valuesCreated = await this.repository.update<id, Values>(id, values);

        return valuesCreated;
    }

    async setVerification<ValueType = {}, Type = string>(value: ValueType, type: Type){
        for (const key in value) {
            if (typeof value[key] !== type) {
                throw new BadRequest(`O item passados possue o valor errado, ele necessitar ser ${type}`);
            }
        }
    }
}

class ControllerBuilder<ServiceType extends ServiceBuilder<RepositoryBuilder<DbModelType>> = ServiceBuilder<RepositoryBuilder<typeof UserModel>>>{
    private errorMiddleware: boolean = false;

    private service: ServiceType;

    constructor(service: ServiceType){
        this.service = service;
    }

    getController<QueryModel = {username: string, email: string}>(type: 'getAll' | 'getOne', atributes: string[]){
        return async (req: RequestPagination, res: Response, next:NextFunction) => {
            try{
                const pagination = req.pagination;
                const query = req.query ? req.query : {};

                const result = await this.service[type]<QueryModel>(query as QueryModel, atributes, pagination);

                res.send(200).json(result);
            }catch(err){
                if(!this.errorMiddleware) res.send(400).json("Não foi possivel encontrar o item.")

                next(err);
            }
        }
    }

    async createController<BodyType = {username: string, email: string}>(){
        return async (req: Request, res: Response, next:NextFunction) => {
            try{
                const result = await this.service.create<BodyType>(req.body as BodyType);

                res.send(200).json(result);
            }catch(err){
                if(!this.errorMiddleware) res.send(400).json("Não foi possivel criar o item.")

                next(err);
            }
        }
    }

    async updateController<Id = {id: string}, BodyType = {username: string, email: string}>(){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const result = await this.service.update<Id, BodyType>({id: req.params} as Id, req.body as BodyType);

                res.send(200).json(result);
            }catch(err){
                if(!this.errorMiddleware) res.send(400).json("Não foi possivel atualizar o item.")

                next(err);
            }
        }
    }

    errorMiddlewareFunction(isTrue: boolean){
        this.errorMiddleware = isTrue;
    }
}

export {DataBaseBuilder, RepositoryBuilder, RepositoryWithForeignBuilder, ServiceBuilder, ControllerBuilder};