

async function maintain() {}

async function remind(loanId) {}

async function guildsWithin() {
  return [
    {
      id: "guild1",
      name: "Guild One",
      icon: null,
      banner: null,
      owner: false,
      permissions: 0,
      permissions_new: "0",
      features: [],
      members: [
        {
          id: "123456789",
          username: "dummyuser",
          displayname: "Dummy User",
          discriminator: "0000",
          avatar: null,
          bot: false,
          roles: [],
        },
        {
          id: "987654321",
          username: "otheruser",
          displayname: "Other User",
          discriminator: "0000",
          avatar: null,
          bot: false,
          roles: [],
        },
      ],
    },
    {
      id: "guild2",
      name: "Guild Two",
      icon: null,
      banner: null,
      owner: false,
      permissions: 0,
      permissions_new: "0",
      features: [],
      members: [
        {
          id: "123456789",
          username: "dummyuser",
          displayname: "Dummy User",
          discriminator: "0000",
          avatar: null,
          bot: false,
          roles: [],
        },
      ],
    },
  ];
}


module.exports = { maintain, guildsWithin, remind };
