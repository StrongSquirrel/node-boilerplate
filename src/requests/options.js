import { User } from 'models';

const allowedImagesMimetypes = [
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/bmp',
];

export default {
  customValidators: {
    notExistsEmail: async (email) => {
      const count = await User.count({ where: { email } });
      if (count === 1) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
    isArray: param => Array.isArray(param),
    isArrayOfInts: (param) => {
      if (Array.isArray(param)) {
        return param.reduce((prev, curr) => prev && Number.isInteger(curr), true);
      }
      return false;
    },
    existsEmail: async (email) => {
      const count = await User.count({ where: { email } });
      if (count === 0) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
    isImage: (param, mimetype) => allowedImagesMimetypes.indexOf(mimetype) !== -1,
    isAudio: (param, mimetype) => /^audio\/.*$/.test(mimetype),
  },
};
