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
      const configList = await this.git.listConfig();
      let userInfo = {};
      Array.from(configList.files).forEach(item => {
        const gitConfig = configList.values[item];
        const name = gitConfig["user.name"];
        const email = gitConfig["user.email"];
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
