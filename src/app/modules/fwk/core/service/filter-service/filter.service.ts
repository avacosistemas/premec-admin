import { Injectable } from '@angular/core';
import { CONTROL_TYPE, NUMBER } from '../../model/dynamic-form/dynamic-field';
import * as _moment from 'moment';
import { MY_FORMATS } from '../dynamic-form/form.validator.service';

const BOOLEAN = 'boolean';
const STRING = 'string';
@Injectable()
export class FilterService{

    private _totalReg: number;


    public set totalReg(v: number) {
        this._totalReg = v;
    }
    
    public get totalReg(): number {
        return this._totalReg;
    }
    private convertValue(value, field){
        if (value === undefined || value === null || value === ''){
            return value;
        }

        if (field.controlType === CONTROL_TYPE.datepicker){
            if (field.options && field.options.format){
                return  _moment(value, field.options.format, true);
            }
            return  _moment(value, MY_FORMATS.parse.dateInput, true);
        }
        return value;
    }
    
    filter(entityValue, filterValue, filterType, fieldDef){
        entityValue = this.convertValue(entityValue, fieldDef);
        filterValue = this.convertValue(filterValue, fieldDef);
        if (filterType === FILTER_TYPE.HAS_VALUE) {
            return this.filterHasValue(entityValue);
        }
        // Si no hay valores para el filtro entonces no se filtra esto incluye undefined, nulos o longitud
        if (filterValue === null || filterValue === undefined || filterValue.length === 0){
            return true;
        } if (entityValue === undefined){
            return false;
        } else if (entityValue !== undefined && filterValue !== undefined && entityValue !== ''){
            if (filterType !== FILTER_TYPE.LIKE){
                switch (filterType){
                    case FILTER_TYPE.EQUALS : return this.filterEquals(filterValue, entityValue);

					case FILTER_TYPE.NOTEQUALS : return this.filterNotEquals(filterValue, entityValue);                    case FILTER_TYPE.LESS_EQUALS: return this.filterLessEquals(filterValue, entityValue);
                    case FILTER_TYPE.GREATER_EQUALS: return this.filterGreaterEquals(filterValue, entityValue);
                    case FILTER_TYPE.LESS: return this.filterLess(filterValue, entityValue);
                    case FILTER_TYPE.GREATER: return this.filterGreater(filterValue, entityValue);
                    default: console.warn('filterType -> ' + filterType + ' not exist...');
                }
            }else{
                return this.filterIncludes(entityValue, filterValue);
            }
        }
        return false;
    }

    private filterEquals(valueA: any, valueB: any){
        if (typeof valueA === BOOLEAN || typeof valueB === BOOLEAN){
        return Boolean(valueA) === Boolean(valueB); 
        }else if (typeof valueA === NUMBER || typeof valueB === NUMBER){
        return Number(valueA) === Number(valueB); 
        }
        return valueA === valueB;
    }

	private filterNotEquals(valueA: any, valueB: any){
        if (typeof valueA === BOOLEAN || typeof valueB === BOOLEAN){
        return Boolean(valueA) != Boolean(valueB); 
        }else if (typeof valueA === NUMBER || typeof valueB === NUMBER){
        return Number(valueA) != Number(valueB); 
        }
        return valueA != valueB;
    }    private filterGreaterEquals(valueA: any, valueB: any){
        if (valueA._f || valueA._isAMomentObject){
            return valueA.isSameOrAfter(valueB);
        }

        return valueA >= valueB;
    }

    private filterLessEquals(valueA: any, valueB: any){
        if (valueA._f || valueA._isAMomentObject){
            return valueA.isSameOrBefore(valueB);
        }
        return valueA <= valueB;
    }

    private filterLess(valueA: any, valueB: any){
        if (valueA._f || valueA._isAMomentObject){
            return valueA.isBefore(valueB);
        }
        return valueA < valueB;
    }

    private filterGreater(valueA: any, valueB: any){
        if (valueA._f || valueA._isAMomentObject){
            return valueA.isAfter(valueB);
        }

        return valueA > valueB;
    }

    private filterHasValue(value){
        return value === null || value === undefined || value.length === 0 ? false : true;
    }

    private filterIncludes(valueA: any, valueB: any){
        if (typeof valueA === BOOLEAN || typeof valueB === BOOLEAN || 
            typeof valueA === NUMBER || typeof valueB === NUMBER ||
            typeof valueA === STRING || typeof valueB === STRING){
        return String(valueA).toLowerCase().includes(String(valueB).toLowerCase());
        }
        console.warn('this type is not posible to filtre ' + valueA);
        console.warn('this type is not posible to filtre ' + valueB);
        return false;
    }
}

export const enum FILTER_TYPE {
    LIKE = 'LIKE',
    EQUALS = 'EQUALS',
	NOTEQUALS = 'NOTEQUALS',
    LESS_EQUALS = 'LESS-EQUALS',
    LESS = 'LESS',
    GREATER_EQUALS = 'GREATER-EQUALS',
    GREATER = 'GREATER',
    HAS_VALUE = 'HAS-VALUE',
}
