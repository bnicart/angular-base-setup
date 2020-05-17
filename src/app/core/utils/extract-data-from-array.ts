export const extract = (key: string) => {
  return {
    as: (reference: string) => {
      return {
        from: (array: Array<any>) => {
          return (array.find(elem => elem[reference] === key) || {}).value
        }
      }
    }
  }
}
