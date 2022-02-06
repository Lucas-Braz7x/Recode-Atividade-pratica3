const initialState = {
  data: [
  ],
}

//Reducer
export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PASSAGEM':
      return {
        ...state, data: [...state.data, {
          usuario: action.usuario, viagem: action.viagem
        }]
      }
    default:
      return state;
  }
}
