export function isConstraintViolates(e: any, constraintName: string): boolean {
  console.log('adkasjdk ', e);
  const parentErrStr = e['parent'] + '';
  return (
    (e['name'] == 'SequelizeUniqueConstraintError' ||
      e['name'] == 'SequelizeForeignKeyConstraintError') &&
    parentErrStr.includes(`violates`) &&
    parentErrStr.includes(`constraint`) &&
    parentErrStr.includes(constraintName)
  );
}
