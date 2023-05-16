import { Injectable } from '@angular/core';
import { DynamicFieldConditionIf } from '../../model/dynamic-form/dynamic-field-condition-if';
import { FILTER_TYPE } from '../filter-service/filter.service';

@Injectable()
export class ExpressionService{

    eval(condition: DynamicFieldConditionIf, entity){
        // this.pepe();
        if (entity === undefined){
            throw new Error('La entidad es indefinida');    
        }
        try{
            if (condition){
                const valueA = condition.key ? entity[condition.key] : undefined;
                const valueB = condition.value ? condition.value : condition.toField ? entity[condition.toField] : undefined;
                const compare = condition.compare ? condition.compare.toUpperCase() : FILTER_TYPE.EQUALS; 
                switch (compare){
                    case FILTER_TYPE.EQUALS: return valueA === valueB;
                    case FILTER_TYPE.NOTEQUALS: return valueA !== valueB;
                    case FILTER_TYPE.GREATER_EQUALS: return valueA >= valueB;
                    case FILTER_TYPE.GREATER: return valueA > valueB;
                    case FILTER_TYPE.LESS_EQUALS: return valueA <= valueB;
                    case FILTER_TYPE.LESS: return valueA < valueB;
                    case FILTER_TYPE.LIKE: return valueA ? valueA.includes(valueB) : valueA === valueB;
                }
            }
            return true;
        }catch (e){
            throw new Error('Error al evaluar la condicion para la entidad' + JSON.parse(entity));    
        }
    }
}
