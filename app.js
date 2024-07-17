var usuarios = []

// Auth class
class Auth {
  // Static method to log in a user
  static login(user) {
    // Generate a token
    const token = Auth.generateToken();

    // Store the token and user information in local storage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Static method to log out a user
  static logout() {
    // Remove the token and user information from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Static method to generate a token
  static generateToken() {
    // Generate a random 36-character string
    return Math.random().toString(36).substr(2);
  }

}

// person class
class Person {
  constructor(name, email,password,role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static registerUser(){
    //create form dinamicly
    const form = document.createElement('form');
    form.innerHTML=`
      <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" aria-describedby="nombreHelp">
            <div id="nombreHelp" class="form-text">Ingrese su nombre completo.</div>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email </label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">No compartiremos su email con nadie.</div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">contraseña</label>
            <input type="password" class="form-control" id="password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    `;

    document.body.append(form);

    //submit form
    form.addEventListener('submit',async (event) => {
      event.preventDefault();
      const name = await document.getElementById('nombre').value;
      const email = await document.getElementById('email').value;
      const password = await document.getElementById('password').value;
      const user = {name, email, password};
      
      Auth.login(user);
      this.saveUser(user)
      alert('Usuario creado exitosamente');
    });
  }

  static validateRole(){
    if(this.role === 'regular'){
      this.registrarseComoUsuarioRegular();
    }else if(this.role === 'admin'){
      this.crearUsuarioAdmin();
    }
  }

  static createReserv(){

  }

  static saveUser(user){
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

}

// UsuarioRegular class
class UsuarioRegular extends Person{

  // Method to register the user as a regular user
  registrarseComoUsuarioRegular() {
    // Implement registration logic
    console.log(`${this.nombre} se ha registrado como usuario regular`);
  }
}

// Administrador class
class Administrador extends Person{

  // Method to create an admin user
  crearUsuarioAdmin() {
    // Implement admin user creation logic
    console.log(`${this.nombre} ha creado un nuevo usuario admin`);
  }
}

// Example usage

Person.registerUser();

