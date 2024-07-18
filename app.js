// Auth class
class Auth {
  static generateToken() {
    return Math.random().toString(36).substr(2);
  }

  static login(token) {
    localStorage.setItem('token', token);
  }

  static logout() {
    localStorage.removeItem('token');
  }
}

// Person class
class Person {
  constructor(name, email, password, role = 'regular') {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role; 
  }

  async registerUser() {
    const form = document.createElement('form');
    form.innerHTML = `
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre" aria-describedby="nombreHelp">
        <div id="nombreHelp" class="form-text">Ingrese su nombre completo.</div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">No compartiremos su email con nadie.</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    `;
    document.body.append(form);
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const user = new Person(name, email, password);
  
      Auth.login(Auth.generateToken());
      this.saveUser(user);
      this.validateRoleRedirect(user)
    });
  }

  validateRoleRedirect(user){
    if(user.role === 'admin'){
      window.location.href = 'userAdmin.html';
    }else if(user.role === "regular"){
      window.location.href = 'userRegular.html';
    }
    else{
      alert("Usuario no valido")
    }
  }
  
  saveUser(user) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
}

// Clase para usuario regular
class UsuarioRegular extends Person {
  constructor(name, email, password) {
    super(name, email, password, 'regular');
  }

  registrarseComoUsuarioRegular() {
    console.log(`${this.name} se ha registrado como usuario regular`);
  }
}

// Clase para administrador
class Administrador extends Person {
  constructor(name, email, password) {
    super(name, email, password, 'admin');
  }

  crearUsuarioAdmin() {
    console.log(`${this.name} ha creado un nuevo usuario administrador`);
  }
}

// Ejemplo de uso
const user = new UsuarioRegular();
user.registerUser();
