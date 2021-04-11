import api from "./api";

class UsuarioDataService {
  getAll() {
    return api.get("/usuarios");
  }

  get(codigo) {
    return api.get(`/usuarios/${codigo}`);
  }

  create(data) {
    return api.post("/usuarios", data);
  }

  update(codigo, data) {
    return api.put(`/usuarios/${codigo}`, data);
  }

  delete(codigo) {
    return api.delete(`/usuarios/${codigo}`);
  }
}

export default new UsuarioDataService();
