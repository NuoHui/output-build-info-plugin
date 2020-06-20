const simpleGit = require("simple-git");
const { CONSOLE_COLOR } = require("./constant");

const warn = msg => console.warn(CONSOLE_COLOR, msg);

class GitUtil {
  constructor() {
    this.git = simpleGit();
  }

  async checkIsGitRepository() {
    let isGitRepo = true;
    try {
      await this.git.status();
    } catch (e) {
      warn(e.message.toString());
      isGitRepo = false;
    }
    return isGitRepo;
  }

  async getLocalGitLatestCommit() {
    try {
      const log = await this.git.log();
      return log.latest || {};
    } catch (e) {
      warn(e.message.toString());
      return {};
    }
  }

  async getLocalCurrentBranch() {
    try {
      const currentBranch = await this.git.branchLocal();
      return currentBranch.current || "";
    } catch (e) {
      warn(e.message.toString());
      return "";
    }
  }

  async getLocalGitUserInfo() {
    try {
      const listConfig = await this.git.listConfig();
      const configFileList = Array.from(listConfig.files).reverse();
      let userInfo = {};
      configFileList.forEach(item => {
        const currentConfig = listConfig.values[item];
        const name = currentConfig["user.name"];
        const email = currentConfig["user.email"];
        if (name && email) {
          userInfo = {
            name: name,
            email: email
          };
          return false;
        }
      });
      return userInfo;
    } catch (e) {
      warn(e.message.toString());
      return {};
    }
  }
}

module.exports = GitUtil;
