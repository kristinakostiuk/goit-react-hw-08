export const selectNameFilter = (state) => {
  return state.filter ? state.filter.name : '';  
};
