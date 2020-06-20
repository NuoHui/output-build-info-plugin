class OutPutBuildInfo {
  constructor(options = {}) {
    this.options = options;
  }
  apply(compiler) {
    // compiler hook: 生成资源到output之前
    compiler.plugin("emit", async (compilation, callback) => {
      callback();
    });
  }
}

export default OutPutBuildInfo;
