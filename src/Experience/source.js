export default [
  {
    name: "environmentTexture",
    type: "cubeTextureLoader",
    path: [
      "./textures/envTexture2/px.png",
      "./textures/envTexture2/nx.png",
      "./textures/envTexture2/py.png",
      "./textures/envTexture2/ny.png",
      "./textures/envTexture2/pz.png",
      "./textures/envTexture2/nz.png",
    ],
  },

  {
    name: "ringModel",
    type: "gltfLoader",
    path: "./models/ring.glb",
  },

  {
    name: "lockerModel",
    type: "gltfLoader",
    path: "./models/locker-v1.glb",
  },

  {
    name: "wallTexture",
    type: "textureLoader",
    path: "./textures/walls_floors1.webp",
  },

  {
    name: "lockerTexture",
    type: "textureLoader",
    path: "./textures/normal_baked_locker.webp",
  },

  {
    name: "jerseyLockerTexture",
    type: "textureLoader",
    path: "./textures/jersey_baked_locker.webp",
  },

  {
    name: "wordTextureLarge",
    type: "textureLoader",
    path: "./textures/words_tag.png",
  },

  {
    name: "wordTextureSmall",
    type: "textureLoader",
    path: "./textures/words_tag_sm.png",
  },

  {
    name: "nameTexture",
    type: "textureLoader",
    path: "./textures/name_tags.png",
  },

  {
    name: "buttonTexture",
    type: "textureLoader",
    path: "./textures/buttonsTexture.png",
  },

  {
    name: "eagleTexture",
    type: "textureLoader",
    path: "./textures/eagle_logo.png",
  },
];
