// Auth class
class Auth {
  static login(user) {
    const token = Auth.generateToken();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static generateToken() {
    return Math.random().toString(36).substr(2);
  }
}

// Person class
class Person {
  constructor(name, email, password, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role || 'regular'; // Default role to 'regular'
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
  
      Auth.login(user);
      this.saveUser(user);
  
      // Redirigir según el rol
      switch (user.role) {
        case 'regular':
          window.location.href = 'usuarioRegular.html';
          break;
        case 'admin':
          window.location.href = 'usuarioAdmin.html';
          break;
        default:
          console.log('Invalid role');
      }
    });
  }
  

  saveUser(user) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  validateRole() {
    switch (this.role) {
      case 'regular':
        this.registrarseComoUsuarioRegular();
        break;
      case 'admin':
        this.crearUsuarioAdmin();
        break;
      default:
        console.log('Invalid role');
    }
  }

  registrarseComoUsuarioRegular() {
    console.log(`${this.name} se ha registrado como usuario regular`);
  }

  crearUsuarioAdmin() {
    console.log(`${this.name} ha creado un nuevo usuario admin`);
  }
}

// Example usage
const user = new Person();
user.registerUser();
