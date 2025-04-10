export const clientExtraReducersSlice = createSlice({
    name: "clientExtraReducersSlice",
    initialState: {
      listeClients: [],
      status: "idle",
      erreur: null,
    },
    reducers: {},
    extraReducers: clientExtraReducers,
  });
  