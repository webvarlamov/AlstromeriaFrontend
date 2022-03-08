import {Directive, Input} from "@angular/core";

@Directive()
export class PropertyView {
  @Input()
  public propertyNameLocalisation: {[propertyName: string]: string} = {
    expressions: "Выражения",
    ranges: "Ограничения",
    operator: "Оператор",
    value1: "Значение 1",
    exclude: "Исключено",
    property: "Свойство"
  }

  public ariaExpanded: boolean = false;

  public isArray(value: any): boolean {
    return Array.isArray(value);
  }

  public isObject(value: any): boolean {
    return typeof value === 'object' && !Array.isArray(value)
  }

  public isNumber(value: any): boolean {
    return typeof value ==='number';
  }

  public isString(value: any): boolean {
    return typeof value ==='string';
  }

  public isBoolean(value: any): boolean {
    return typeof value ==='boolean';
  }

  public getPropertyNameLocalisation(key: unknown): string {
    return (this.propertyNameLocalisation[key as string] != null
      ? this.propertyNameLocalisation[key as string]
      : key) as string;
  }
}
