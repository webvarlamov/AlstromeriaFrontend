import {TypeGraph} from "./object-view.component";

export class TypeFinderService {
  private ENUM_WRAPPER = 'Enum<';
  private ARRAY_WRAPPER = 'Array<';
  private RIGHT_BRACKET = '[';
  private LEFT_BRACKET = ']';
  private LEFT_ANGLE_BRACKET = '<';
  private RIGHT_ANGLE_BRACKET = '>';
  private STRING_TYPE = 'string';
  private NUMBER_TYPE = 'number';
  private ANY_TYPE = 'any';
  private BOOLEAN_TYPE = 'boolean';
  private ARRAY_TYPE = 'array';
  private OBJECT_TYPE = 'object';

  public isArray(type: string): boolean {
    return type.includes(this.ARRAY_WRAPPER)
  }

  public isObject(type: string, typeGraph: TypeGraph & any): boolean {
    return typeGraph[type] != null;
  }

  public isNumber(type: string): boolean {
    return type === this.NUMBER_TYPE
  }

  public isString(type: string): boolean {
    return type === this.STRING_TYPE
  }

  public isBoolean(type: string): boolean {
    return type === this.BOOLEAN_TYPE
  }

  public isAny(type: string): boolean {
    return type === this.ANY_TYPE
  }

  public isEnum(type: any): boolean {
    return type.includes(this.ENUM_WRAPPER)
  }

  public getObjectPropertyType(key: unknown, typeGraph: any, propertyOwnerType: string): string {
    let typeGraphElementElement = typeGraph[propertyOwnerType][key as string];
    return typeGraphElementElement
  }

  public getArrayElementType(type: string): string {
    return type.replace(this.ARRAY_WRAPPER, "")
               .replace(this.RIGHT_ANGLE_BRACKET, "");
  }

  public getEnumMemberType(type: string): string {
    return type.replace(this.ENUM_WRAPPER, "")
      .replace(this.RIGHT_ANGLE_BRACKET, "");
  }
}
