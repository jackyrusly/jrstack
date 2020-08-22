import { DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

class SnakeCaseNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string) {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ) {
    return snakeCase(
      embeddedPrefixes.concat(customName ? customName : propertyName).join('_'),
    );
  }

  columnNameCustomized(customName: string) {
    return customName;
  }

  relationName(propertyName: string) {
    return snakeCase(propertyName);
  }

  joinTableName(firstTableName: string, secondTableName: string) {
    return `${snakeCase(firstTableName)}_${secondTableName}`;
  }
}

export { SnakeCaseNamingStrategy };
