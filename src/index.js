const GitUtil = require("./git-util");
const { DEFAULT_OUT_PUT_FILENAME } = require("./constant");

class OutPutBuildInfoWebpackPlugin {
  constructor(options = {}) {
    this.gitUtil = new GitUtil();
    this.env = options.env || process.env.NODE_ENV;
    this.outputName = options.outputName || DEFAULT_OUT_PUT_FILENAME;
  }
  apply(compiler) {
    // compiler hook: 生成资源到output之前
    compiler.plugin("emit", async (compilation, callback) => {
      const isGitRepo = await this.gitUtil.checkIsGitRepository();
      if (isGitRepo) {
        const outputName = this.outputName;
        const output = {};
        output.git = {
          last_commit: await this.gitUtil.getLocalGitLatestCommit(),
          current_branch: await this.gitUtil.getLocalCurrentBranch(),
          build_user: await this.gitUtil.getLocalGitUserInfo()
        };
        // 为 compilation 创建额外 asset
        compilation.assets[outputName] = {
          source() {
            return JSON.stringify(output);
          },
          size() {
            return output.length;
          }
        };
      }
      callback();
    });
  }
}

module.exports = OutPutBuildInfoWebpackPlugin;
