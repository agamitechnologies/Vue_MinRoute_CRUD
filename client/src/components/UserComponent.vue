<template>
  <div class="center">
    <div class="d-flex">
      <button type="button" class="btn btn-secondary round" v-if="!showInputs" @click="
        selectedUser = {};
      showInputs = true;
      ">
        Add User <i class="fa-solid fa-plus"></i>
      </button>
    </div>

    <table class="table mt-2" v-if="showInputs">
      <tr>
        <td>
          <input type="text" name="" class="form-control" id="" placeholder="Name" v-model="selectedUser.name" />
        </td>
        <td>
          <input type="text" name="" class="form-control" id="" placeholder="Email"
            v-model="selectedUser.email" />
        </td>
        <td>
          <input type="text" name="" id="" class="form-control" placeholder="Phone"
            v-model="selectedUser.phone" />
        </td>

        <td>
          <button v-if="selectedUser && selectedUser._id" class="btn btn-info" type="button"
            @click="updateUser()">
            <i class="fa-solid fa-check"></i>
          </button>
          <button type="button" v-else @click="addUser()" class="btn btn-info">
            <i class="fa-solid fa-check"></i>
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-info" @click="
            selectedUser = {};
          showInputs = false;
          ">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </td>
      </tr>
    </table>

    <table class="table border mt-2" v-else-if="users && users.length > 0">
      <thead>
        <tr>
          <th class="text-start">Sr</th>
          <th class="text-start">Name</th>
          <th class="text-start">Email</th>
          <th class="text-start">Phone</th>
          <th class="text-start">Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(user, id) in users" v-bind:key="id">
          <th scope="row">{{ id + 1 }}</th>
          <td class="text-start">{{ user.name }}</td>
          <td class="text-start">{{ user.email }}</td>
          <td class="text-start">{{ user.phone }}</td>
          <td class="text-start">
            <button @click="
              selectedUser = user;
            showInputs = true;
            " class="btn btn-info">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </td>
          <td class="text-start">
            <button type="button" @click="deleteUser(user._id)" class="btn btn-danger">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      <br />
      <p>No users exists, add some</p>
    </div>
  </div>
</template>

<script  lang="ts">
export default {
  name: "UserComponent",
  props: {
    msg: String,
  },

  data() {
    return {
      users: [],
      selectedUser: { name: "", email: "", phone: "" },
      showInputs: false,
    };
  },
  methods: {
    // get all users
    async getAllUsers() {
      let data = await fetch("http://localhost:9000/controller001.getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          return data.json();
        })
        .catch((e) => {
          console.log(e);
        });
      this.users = data.data;
    },

    // delete a user
    async deleteUser(id) {
      await fetch("http://localhost:9000/controller001.deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      })
        .then(() => {
          console.log("delete successfully");
        })
        .catch((e) => {
          console.log(e);
        });

      await this.getAllUsers();
    },

    // create a new user
    async addUser() {
      await fetch("http://localhost:9000/controller001.postUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.selectedUser),
      })
        .then((data) => {
          console.log("added successfully");
          if (data.ok) {
            this.getAllUsers();
            this.showInputs = false;
            this.selectedUser = {};
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // update a user
    async updateUser() {
      await fetch("http://localhost:9000/controller001.updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.selectedUser),
      })
        .then((data) => {
          if (data.ok) {
            this.getAllUsers();
            this.showInputs = false;
            this.selectedUser = {};
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.getAllUsers();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.center {
  margin: auto;
  width: fit-content;
  padding: 10px;
}
</style>
