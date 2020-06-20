!(function(t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var i = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function(t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function(t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function(t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" === typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var i in t)
          n.d(
            r,
            i,
            function(e) {
              return t[e];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 14));
})([
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(9);
    (e.EMPTY_COMMANDS = []),
      (e.configurationErrorTask = function(t) {
        return {
          commands: e.EMPTY_COMMANDS,
          format: "utf-8",
          parser() {
            throw "string" === typeof t ? new r.TaskConfigurationError(t) : t;
          }
        };
      }),
      (e.straightThroughStringTask = function(t) {
        return { commands: t, format: "utf-8", parser: t => t };
      }),
      (e.isBufferTask = function(t) {
        return "buffer" === t.format;
      }),
      (e.isEmptyTask = function(t) {
        return !t.commands.length;
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    class r extends Error {
      constructor(t, e) {
        super(e),
          (this.task = t),
          Object.setPrototypeOf(this, new.target.prototype);
      }
    }
    e.GitError = r;
  },
  function(t, e, n) {
    "use strict";
    function r(t) {
      for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
    }
    Object.defineProperty(e, "__esModule", { value: !0 }),
      r(n(27)),
      r(n(28)),
      r(n(11));
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(1);
    class i extends r.GitError {
      constructor(t, e) {
        super(void 0, e || String(t)), (this.git = t);
      }
    }
    e.GitResponseError = i;
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    var r = n(10);
    e.CleanOptions = r.CleanOptions;
    var i = n(1);
    e.GitError = i.GitError;
    var o = n(3);
    e.GitResponseError = o.GitResponseError;
    var s = n(9);
    e.TaskConfigurationError = s.TaskConfigurationError;
  },
  function(t, e, n) {
    const r = n(18),
      i = Object.create(null);
    for (let t = n(4), e = Object.keys(t), r = 0; r < e.length; r++) {
      const n = e[r];
      /^[A-Z]/.test(n) && (i[n] = t[n]);
    }
    (t.exports.gitExportFactory = function(t, e) {
      return Object.assign(
        function() {
          return t.apply(null, arguments);
        },
        i,
        e || {}
      );
    }),
      (t.exports.gitInstanceFactory = function(t) {
        const e = n(46);
        if (t && !e.exists(t, e.exists.FOLDER))
          throw new Error(
            "Cannot use simple-git on a directory that does not exist."
          );
        return new r(t || process.cwd(), e.childProcess(), e.buffer());
      });
  },
  function(t, e, n) {
    var r = n(19);
    function i(t, e, n) {
      try {
        var i = !1,
          o = r.statSync(t);
        return (i = (i = i || (e && o.isFile())) || (n && o.isDirectory()));
      } catch (t) {
        if ("ENOENT" === t.code) return !1;
        throw t;
      }
    }
    (t.exports = function(t, e) {
      return e ? i(t, 1 & e, 2 & e) : i(t, !0, !0);
    }),
      (t.exports.FILE = 1),
      (t.exports.FOLDER = 2);
  },
  function(t, e) {
    function n() {
      (this.files = []),
        (this.insertions = 0),
        (this.deletions = 0),
        (this.changed = 0);
    }
    function r(t, e) {
      if ((t = t.trim().match(/^(.+)\s+\|\s+(\d+)(\s+[+\-]+)?$/))) {
        var n = (t[3] || "").trim();
        return (
          e.push({
            file: t[1].trim(),
            changes: parseInt(t[2], 10),
            insertions: n.replace(/-/g, "").length,
            deletions: n.replace(/\+/g, "").length,
            binary: !1
          }),
          !0
        );
      }
    }
    function i(t, e) {
      if ((t = t.match(/^(.+) \|\s+Bin ([0-9.]+) -> ([0-9.]+) ([a-z]+)$/)))
        return (
          e.push({
            file: t[1].trim(),
            before: +t[2],
            after: +t[3],
            binary: !0
          }),
          !0
        );
    }
    (t.exports = n),
      (n.prototype.insertions = 0),
      (n.prototype.deletions = 0),
      (n.prototype.changed = 0),
      (n.parse = function(t) {
        var e,
          o = t.trim().split("\n"),
          s = new n(),
          u = o.pop();
        for (
          u &&
          u
            .trim()
            .split(", ")
            .forEach(function(t) {
              var e = /(\d+)\s([a-z]+)/.exec(t);
              e &&
                (/files?/.test(e[2])
                  ? (s.changed = parseInt(e[1], 10))
                  : (s[e[2].replace(/s$/, "") + "s"] = parseInt(e[1], 10)));
            });
          (e = o.shift());

        )
          r(e, s.files) || i(e, s.files);
        return s;
      });
  },
  function(t, e) {
    function n() {
      (this.files = []),
        (this.insertions = {}),
        (this.deletions = {}),
        (this.summary = { changes: 0, insertions: 0, deletions: 0 }),
        (this.created = []),
        (this.deleted = []);
    }
    function r(t, e) {
      var r = n.FILE_UPDATE_REGEX.exec(e);
      if (!r) return !1;
      t.files.push(r[1]);
      var i = r[2].length;
      i && (t.insertions[r[1]] = i);
      var o = r[3].length;
      return o && (t.deletions[r[1]] = o), !0;
    }
    function i(t, e) {
      if (!t.files.length) return !1;
      var r = n.SUMMARY_REGEX.exec(e);
      return (
        !(!r || (void 0 === r[3] && void 0 === r[5])) &&
        ((t.summary.changes = +r[1] || 0),
        (t.summary.insertions = +r[3] || 0),
        (t.summary.deletions = +r[5] || 0),
        !0)
      );
    }
    function o(t, e) {
      var r = n.ACTION_REGEX.exec(e);
      if (!r) return !1;
      var i = r[2];
      return (
        t.files.indexOf(i) < 0 && t.files.push(i),
        ("create" === r[1] ? t.created : t.deleted).push(i),
        !0
      );
    }
    (t.exports = n),
      (n.prototype.created = null),
      (n.prototype.deleted = null),
      (n.prototype.files = null),
      (n.prototype.insertions = null),
      (n.prototype.deletions = null),
      (n.prototype.summary = null),
      (n.FILE_UPDATE_REGEX = /^\s*(.+?)\s+\|\s+\d+\s*(\+*)(-*)/),
      (n.SUMMARY_REGEX = /(\d+)\D+((\d+)\D+\(\+\))?(\D+(\d+)\D+\(-\))?/),
      (n.ACTION_REGEX = /(create|delete) mode \d+ (.+)/),
      (n.parse = function(t) {
        for (var e = new n(), s = t.split("\n"); s.length; ) {
          var u = s.shift().trim();
          u && (r(e, u) || i(e, u) || o(e, u));
        }
        return e;
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(1);
    class i extends r.GitError {
      constructor(t) {
        super(void 0, t);
      }
    }
    e.TaskConfigurationError = i;
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(0),
      i = n(26);
    var o;
    (e.CONFIG_ERROR_INTERACTIVE_MODE =
      "Git clean interactive mode is not supported"),
      (e.CONFIG_ERROR_MODE_REQUIRED =
        'Git clean mode parameter ("n" or "f") is required'),
      (e.CONFIG_ERROR_UNKNOWN_OPTION = "Git clean unknown option found in: "),
      (function(t) {
        (t.DRY_RUN = "n"),
          (t.FORCE = "f"),
          (t.IGNORED_INCLUDED = "x"),
          (t.IGNORED_ONLY = "X"),
          (t.EXCLUDING = "e"),
          (t.QUIET = "q"),
          (t.RECURSIVE = "d");
      })((o = e.CleanOptions || (e.CleanOptions = {})));
    const s = new Set(["i", ...Object.values(o)]);
    function u(t, e) {
      return {
        commands: ["clean", "-" + t, ...e],
        format: "utf-8",
        parser: e => i.cleanSummaryParser(t === o.DRY_RUN, e)
      };
    }
    function a(t) {
      return /^-[^\-]/.test(t) ? t.indexOf("i") > 0 : "--interactive" === t;
    }
    (e.cleanWithOptionsTask = function(t, n) {
      const { cleanMode: i, options: c, valid: l } = (function(t) {
        let e,
          n = [],
          r = { cleanMode: !1, options: !0 };
        return (
          t
            .replace(/[^a-z]i/g, "")
            .split("")
            .forEach(t => {
              var i;
              !(function(t) {
                return t === o.FORCE || t === o.DRY_RUN;
              })(t)
                ? (r.options =
                    r.options &&
                    ((i = n[n.length] = "-" + t),
                    /^-[a-z]$/i.test(i) && s.has(i.charAt(1))))
                : ((e = t), (r.cleanMode = !0));
            }),
          { cleanMode: e, options: n, valid: r }
        );
      })(t);
      return i
        ? l.options
          ? (c.push(...n),
            c.some(a)
              ? r.configurationErrorTask(e.CONFIG_ERROR_INTERACTIVE_MODE)
              : u(i, c))
          : r.configurationErrorTask(
              e.CONFIG_ERROR_UNKNOWN_OPTION + JSON.stringify(t)
            )
        : r.configurationErrorTask(e.CONFIG_ERROR_MODE_REQUIRED);
    }),
      (e.cleanTask = u),
      (e.isCleanOptionsArray = function(t) {
        return Array.isArray(t) && t.every(t => s.has(t));
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.NOOP = () => {}),
      (e.asFunction = function(t) {
        return "function" === typeof t ? t : e.NOOP;
      }),
      (e.isUserFunction = function(t) {
        return "function" === typeof t && t !== e.NOOP;
      }),
      (e.splitOn = function(t, e) {
        const n = t.indexOf(e);
        return n <= 0 ? [t, ""] : [t.substr(0, n), t.substr(n + 1)];
      }),
      (e.last = function(t) {
        return t && t.length ? t[t.length - 1] : void 0;
      }),
      (e.toLinesWithContent = function(t, e = !1) {
        return t.split("\n").reduce((t, n) => {
          const r = e ? n.trim() : n;
          return r && t.push(r), t;
        }, []);
      });
  },
  function(t, e) {
    t.exports = require("child_process");
  },
  function(t, e, n) {
    "use strict";
    n.r(e),
      (e.default = {
        CONSOLE_COLOR: "[33m%s[0m:",
        DEFAULT_OUT_PUT_FILENAME: "build.json"
      });
  },
  function(t, e, n) {
    "use strict";
    n.r(e);
    const r = n(15),
      { DEFAULT_OUT_PUT_FILENAME: i } = n(13);
    e.default = class {
      constructor(t = {}) {
        (this.gitUtil = new r()),
          (this.env = t.env || "production"),
          (this.outputName = t.outputName || i);
      }
      apply(t) {
        t.plugin("emit", async (t, e) => {
          if (await this.gitUtil.checkIsGitRepository()) {
            const e = this.outputName,
              n = {};
            (n.git = {
              last_commit: await this.gitUtil.getLocalGitLatestCommit(),
              current_branch: await this.gitUtil.getLocalCurrentBranch(),
              build_user: await this.gitUtil.getLocalGitUserInfo()
            }),
              (t.assets[e] = {
                source: () => JSON.stringify(n),
                size: () => n.length
              });
          }
          e();
        });
      }
    };
  },
  function(t, e, n) {
    "use strict";
    n.r(e);
    const r = n(16),
      { CONSOLE_COLOR: i } = n(13),
      o = t => console.warn(i, t);
    e.default = class {
      constructor() {
        this.git = r();
      }
      async checkIsGitRepository() {
        let t = !0;
        try {
          await this.git.status();
        } catch (e) {
          o(e.message.toString()), (t = !1);
        }
        return t;
      }
      async getLocalGitLatestCommit() {
        try {
          return (await this.git.log()).latest || {};
        } catch (t) {
          return o(t.message.toString()), {};
        }
      }
      async getLocalCurrentBranch() {
        try {
          return (await this.git.branchLocal()).current || "";
        } catch (t) {
          return o(t.message.toString()), "";
        }
      }
      async getLocalGitUserInfo() {
        try {
          const t = await this.git.listConfig(),
            e = Array.from(t.files).reverse();
          let n = {};
          return (
            e.forEach(e => {
              const r = t.values[e],
                i = r["user.name"],
                o = r["user.email"];
              if (i && o) return (n = { name: i, email: o }), !1;
            }),
            n
          );
        } catch (t) {
          return o(t.message.toString()), {};
        }
      }
    };
  },
  function(t, e, n) {
    const { gitP: r } = n(17),
      { gitInstanceFactory: i, gitExportFactory: o } = n(5);
    t.exports = o(i, { gitP: r });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(3),
      i = ["customBinary", "env", "outputHandler", "silent"],
      o = [
        "add",
        "addAnnotatedTag",
        "addConfig",
        "addRemote",
        "addTag",
        "binaryCatFile",
        "branch",
        "branchLocal",
        "catFile",
        "checkIgnore",
        "checkIsRepo",
        "checkout",
        "checkoutBranch",
        "checkoutLatestTag",
        "checkoutLocalBranch",
        "clean",
        "clone",
        "commit",
        "cwd",
        "deleteLocalBranch",
        "deleteLocalBranches",
        "diff",
        "diffSummary",
        "exec",
        "fetch",
        "getRemotes",
        "init",
        "listConfig",
        "listRemote",
        "log",
        "merge",
        "mergeFromTo",
        "mirror",
        "mv",
        "pull",
        "push",
        "pushTags",
        "raw",
        "rebase",
        "remote",
        "removeRemote",
        "reset",
        "revert",
        "revparse",
        "rm",
        "rmKeepLocal",
        "show",
        "stash",
        "stashList",
        "status",
        "subModule",
        "submoduleAdd",
        "submoduleInit",
        "submoduleUpdate",
        "tag",
        "tags",
        "updateServerInfo"
      ],
      { gitInstanceFactory: s } = n(5);
    e.gitP = function(t) {
      let e,
        n = Promise.resolve();
      try {
        e = s(t);
      } catch (t) {
        n = Promise.reject(t);
      }
      function u() {
        return c;
      }
      function a() {
        return n;
      }
      const c = [...i, ...o].reduce((t, i) => {
        const s = o.includes(i),
          c = s
            ? (function(t, e) {
                return function(...i) {
                  if ("function" === typeof i[i.length])
                    throw new TypeError(
                      "Promise interface requires that handlers are not supplied inline, trailing function not allowed in call to " +
                        t
                    );
                  return n.then(function() {
                    return new Promise(function(n, o) {
                      i.push((t, e) => {
                        if (t)
                          return o(
                            (function(t) {
                              if (t instanceof Error) return t;
                              if ("string" === typeof t) return new Error(t);
                              return new r.GitResponseError(t);
                            })(t)
                          );
                        n(e);
                      }),
                        e[t].apply(e, i);
                    });
                  });
                };
              })(i, e)
            : (function(t, e, n) {
                return (...r) => (e[t](...r), n);
              })(i, e, t),
          l = s ? a : u;
        return (
          Object.defineProperty(t, i, {
            enumerable: !1,
            configurable: !1,
            value: e ? c : l
          }),
          t
        );
      }, {});
      return c;
    };
  },
  function(t, e, n) {
    const r = n(6),
      i = n(20),
      { configurationErrorTask: o } = n(0),
      { GitResponseError: s } = n(4),
      {
        NOOP: u,
        asFunction: a,
        filterArray: c,
        filterFunction: l,
        filterPlainObject: f,
        filterPrimitives: p,
        filterString: h,
        filterType: g,
        isUserFunction: m
      } = n(2),
      { GitExecutor: d } = n(29),
      { GitLogger: y } = n(30),
      {
        branchTask: _,
        branchLocalTask: O,
        deleteBranchesTask: T,
        deleteBranchTask: v
      } = n(31),
      { taskCallback: b } = n(34),
      { addConfigTask: S, listConfigTask: E } = n(35),
      { cleanWithOptionsTask: A, isCleanOptionsArray: R } = n(10),
      {
        addRemoteTask: k,
        getRemotesTask: P,
        listRemotesTask: x,
        remoteTask: w,
        removeRemoteTask: F
      } = n(37),
      { statusTask: M } = n(39),
      {
        addSubModuleTask: L,
        initSubModuleTask: C,
        subModuleTask: j,
        updateSubModuleTask: D
      } = n(42),
      { addAnnotatedTagTask: N, addTagTask: U, tagListTask: I } = n(43),
      { parseCheckIgnore: G } = n(45);
    function B(t) {
      (this._executor = new d("git", t)),
        (this._logger = new y(/prod/.test("production"))),
        (this._promise = Promise.resolve());
    }
    function $(t) {
      return i[t];
    }
    (B.prototype._executor = null),
      (B.prototype._logger = null),
      (B.prototype._promise = null),
      (B.prototype.customBinary = function(t) {
        return (this._executor.binary = t), this;
      }),
      (B.prototype.env = function(t, e) {
        return (
          1 === arguments.length && "object" === typeof t
            ? (this._executor.env = t)
            : ((this._executor.env = this._executor.env || {})[t] = e),
          this
        );
      }),
      (B.prototype.cwd = function(t, e) {
        var n = this,
          i = B.trailingFunctionArgument(arguments) || u;
        return this.exec(function() {
          if (!r(t, r.FOLDER))
            return B.exception(
              n,
              'Git.cwd: cannot change to non-directory "' + t + '"',
              i
            );
          (n._executor.cwd = t), i(null, t);
        });
      }),
      (B.prototype.outputHandler = function(t) {
        return (this._executor.outputHandler = t), this;
      }),
      (B.prototype.init = function(t, e) {
        var n = ["init"];
        return (
          !0 === t && n.push("--bare"),
          this._run(n, B.trailingFunctionArgument(arguments))
        );
      }),
      (B.prototype.status = function(t) {
        return this._runTask(M(), t);
      }),
      (B.prototype.stashList = function(t, e) {
        var n = B.trailingFunctionArgument(arguments),
          r = (n === e ? t : null) || {},
          i = r.splitter || $("ListLogSummary").SPLITTER,
          o = [
            "stash",
            "list",
            "--pretty=format:" +
              $("ListLogSummary").START_BOUNDARY +
              "%H %ai %s%d %aN %ae".replace(/\s+/g, i) +
              $("ListLogSummary").COMMIT_BOUNDARY
          ];
        return (
          Array.isArray(r) && (o = o.concat(r)),
          this._run(o, n, { parser: B.responseParser("ListLogSummary", i) })
        );
      }),
      (B.prototype.stash = function(t, e) {
        return this._run(
          ["stash"].concat(B.getTrailingOptions(arguments)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.clone = function(t, e, n, r) {
        const i = ["clone"].concat(B.trailingArrayArgument(arguments));
        for (let t = 0, e = arguments.length; t < e; t++)
          "string" === typeof arguments[t] && i.push(arguments[t]);
        return this._run(i, B.trailingFunctionArgument(arguments));
      }),
      (B.prototype.mirror = function(t, e, n) {
        return this.clone(t, e, ["--mirror"], n);
      }),
      (B.prototype.mv = function(t, e, n) {
        var r = [].concat(t);
        r.unshift("mv", "-v"),
          r.push(e),
          this._run(r, B.trailingFunctionArgument(arguments), {
            parser: B.responseParser("MoveSummary")
          });
      }),
      (B.prototype.checkoutLatestTag = function(t) {
        var e = this;
        return this.pull(function() {
          e.tags(function(n, r) {
            e.checkout(r.latest, t);
          });
        });
      }),
      (B.prototype.add = function(t, e) {
        return this._run(
          ["add"].concat(t),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.commit = function(t, e, n, r) {
        var i = ["commit"];
        return (
          [].concat(t).forEach(function(t) {
            i.push("-m", t);
          }),
          [].push.apply(
            i,
            [].concat("string" === typeof e || Array.isArray(e) ? e : [])
          ),
          B._appendOptions(i, B.trailingOptionsArgument(arguments)),
          this._run(i, B.trailingFunctionArgument(arguments), {
            parser: B.responseParser("CommitSummary")
          })
        );
      }),
      (B.prototype.pull = function(t, e, n, r) {
        var i = ["pull"];
        return (
          "string" === typeof t && "string" === typeof e && i.push(t, e),
          this._run(
            i.concat(B.getTrailingOptions(arguments)),
            B.trailingFunctionArgument(arguments),
            { parser: B.responseParser("PullSummary") }
          )
        );
      }),
      (B.prototype.fetch = function(t, e, n) {
        const r = ["fetch"].concat(B.getTrailingOptions(arguments));
        return (
          "string" === typeof t && "string" === typeof e && r.push(t, e),
          this._run(r, B.trailingFunctionArgument(arguments), {
            concatStdErr: !0,
            parser: B.responseParser("FetchSummary")
          })
        );
      }),
      (B.prototype.silent = function(t) {
        return this._logger.silent(!!t), this;
      }),
      (B.prototype.tags = function(t, e) {
        this._runTask(
          I(B.getTrailingOptions(arguments)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.rebase = function(t, e) {
        return this._run(
          ["rebase"].concat(B.getTrailingOptions(arguments)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.reset = function(t, e) {
        var n = ["reset"],
          r = B.trailingFunctionArgument(arguments);
        if (r !== t && "string" !== typeof t && t)
          Array.isArray(t) && n.push.apply(n, t);
        else {
          var i = ["mixed", "soft", "hard"].includes(t) ? t : "soft";
          n.push("--" + i);
        }
        return this._run(n, r);
      }),
      (B.prototype.revert = function(t, e, n) {
        const r = B.trailingFunctionArgument(arguments);
        if ("string" !== typeof t)
          return this._runTask(o("Commit must be a string"), r);
        const i = ["revert"];
        return (
          B._appendOptions(i, B.trailingOptionsArgument(arguments)),
          i.push(t),
          this._run(i, r)
        );
      }),
      (B.prototype.addTag = function(t, e) {
        const n =
          "string" === typeof t ? U(t) : o("Git.addTag requires a tag name");
        return this._runTask(n, B.trailingFunctionArgument(arguments));
      }),
      (B.prototype.addAnnotatedTag = function(t, e, n) {
        return this._runTask(N(t, e), B.trailingFunctionArgument(arguments));
      }),
      (B.prototype.checkout = function(t, e) {
        var n = ["checkout"];
        return (
          (n = n.concat(t)), this._run(n, B.trailingFunctionArgument(arguments))
        );
      }),
      (B.prototype.checkoutBranch = function(t, e, n) {
        return this.checkout(["-b", t, e], n);
      }),
      (B.prototype.checkoutLocalBranch = function(t, e) {
        return this.checkout(["-b", t], e);
      }),
      (B.prototype.deleteLocalBranch = function(t, e, n) {
        return this._runTask(
          v(t, "boolean" === typeof e && e),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.deleteLocalBranches = function(t, e, n) {
        return this._runTask(
          T(t, "boolean" === typeof e && e),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.branch = function(t, e) {
        return this._runTask(
          _(B.getTrailingOptions(arguments)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.branchLocal = function(t) {
        return this._runTask(O(), B.trailingFunctionArgument(arguments));
      }),
      (B.prototype.addConfig = function(t, e, n, r) {
        return this._runTask(
          S(t, e, "boolean" === typeof n && n),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.listConfig = function() {
        return this._runTask(E(), B.trailingFunctionArgument(arguments));
      }),
      (B.prototype.raw = function(t, e) {
        const n = !Array.isArray(t),
          r = [].slice.call(n ? arguments : t, 0);
        for (let t = 0; t < r.length && n; t++)
          if (!p(r[t])) {
            r.splice(t, r.length - t);
            break;
          }
        B._appendOptions(r, B.trailingOptionsArgument(arguments));
        var i = B.trailingFunctionArgument(arguments);
        return r.length
          ? this._run(r, i)
          : this._runTask(
              o("Raw: must supply one or more command to execute"),
              i
            );
      }),
      (B.prototype.submoduleAdd = function(t, e, n) {
        return this._runTask(L(t, e), B.trailingFunctionArgument(arguments));
      }),
      (B.prototype.submoduleUpdate = function(t, e) {
        return this._runTask(
          D(B.getTrailingOptions(arguments, !0)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.submoduleInit = function(t, e) {
        return this._runTask(
          C(B.getTrailingOptions(arguments, !0)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.subModule = function(t, e) {
        return this._runTask(
          j(B.getTrailingOptions(arguments)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.listRemote = function(t, e) {
        return this._runTask(
          x(B.getTrailingOptions(arguments)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.addRemote = function(t, e, n) {
        return this._runTask(
          k(t, e, B.getTrailingOptions(arguments)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.removeRemote = function(t, e) {
        return this._runTask(F(t), B.trailingFunctionArgument(arguments));
      }),
      (B.prototype.getRemotes = function(t, e) {
        return this._runTask(
          P(!0 === t),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.remote = function(t, e) {
        return this._runTask(
          w(B.getTrailingOptions(arguments)),
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.mergeFromTo = function(t, e, n, r) {
        var i = [t, e];
        return (
          Array.isArray(n) && (i = i.concat(n)),
          this.merge(i, B.trailingUserFunctionArgument(arguments))
        );
      }),
      (B.prototype.merge = function(t, e) {
        const n = B.trailingFunctionArgument(arguments),
          r = B.getTrailingOptions(arguments);
        if (("merge" !== r[0] && r.unshift("merge"), 1 === r.length))
          return this._runTask(o("Git.merge requires at least one option"), n);
        const i = B.responseParser("MergeSummary");
        return this._run(r, B.trailingFunctionArgument(arguments), {
          concatStdErr: !0,
          parser(t) {
            const e = i(t);
            if (e.failed) throw new s(e);
            return e;
          }
        });
      }),
      (B.prototype.tag = function(t, e) {
        const n = B.getTrailingOptions(arguments);
        return (
          "tag" !== n[0] && n.unshift("tag"),
          this._run(n, B.trailingFunctionArgument(arguments))
        );
      }),
      (B.prototype.updateServerInfo = function(t) {
        return this._run(
          ["update-server-info"],
          B.trailingFunctionArgument(arguments)
        );
      }),
      (B.prototype.push = function(t, e, n) {
        var r = [],
          i = B.trailingFunctionArgument(arguments);
        return (
          "string" === typeof t && "string" === typeof e && r.push(t, e),
          Array.isArray(t) && (r = r.concat(t)),
          B._appendOptions(r, B.trailingOptionsArgument(arguments)),
          "push" !== r[0] && r.unshift("push"),
          this._run(r, i)
        );
      }),
      (B.prototype.pushTags = function(t, e) {
        var n = ["push"];
        return (
          "string" === typeof t && n.push(t),
          n.push("--tags"),
          this._run(n, B.trailingFunctionArgument(arguments))
        );
      }),
      (B.prototype.rm = function(t, e) {
        return this._rm(t, "-f", e);
      }),
      (B.prototype.rmKeepLocal = function(t, e) {
        return this._rm(t, "--cached", e);
      }),
      (B.prototype.catFile = function(t, e) {
        return this._catFile("utf-8", arguments);
      }),
      (B.prototype.binaryCatFile = function(t, e) {
        return this._catFile("buffer", arguments);
      }),
      (B.prototype._catFile = function(t, e) {
        var n = B.trailingFunctionArgument(e),
          r = ["cat-file"],
          i = e[0];
        return "string" === typeof i
          ? this._runTask(
              o("Git#catFile: options must be supplied as an array of strings"),
              n
            )
          : (Array.isArray(i) && r.push.apply(r, i),
            this._run(r, n, { format: t }));
      }),
      (B.prototype.diff = function(t, e) {
        var n = ["diff"];
        return (
          "string" === typeof t
            ? ((n[0] += " " + t),
              this._logger.warn(
                "Git#diff: supplying options as a single string is now deprecated, switch to an array of strings"
              ))
            : Array.isArray(t) && n.push.apply(n, t),
          "function" === typeof arguments[arguments.length - 1] &&
            (e = arguments[arguments.length - 1]),
          this._run(n, function(t, n) {
            e && e(t, n);
          })
        );
      }),
      (B.prototype.diffSummary = function(t, e) {
        return this._run(
          ["diff", "--stat=4096"].concat(B.getTrailingOptions(arguments, !0)),
          B.trailingFunctionArgument(arguments),
          { parser: B.responseParser("DiffSummary") }
        );
      }),
      (B.prototype.revparse = function(t, e) {
        var n = B.trailingFunctionArgument(arguments) || u,
          r = ["rev-parse"];
        return (
          ("string" === typeof t || Array.isArray(t)) && (r = r.concat(t)),
          this._run(r, function(t, e) {
            t ? n(t) : n(null, String(e).trim());
          })
        );
      }),
      (B.prototype.show = function(t, e) {
        var n = B.trailingFunctionArgument(arguments) || u,
          r = ["show"];
        return (
          ("string" === typeof t || Array.isArray(t)) && (r = r.concat(t)),
          this._run(r, function(t, e) {
            t ? n(t) : n(null, e);
          })
        );
      }),
      (B.prototype.clean = function(t, e, n) {
        const r = R(t),
          i = (r && t.join("")) || g(t, h) || "",
          o = B.getTrailingOptions([].slice.call(arguments, r ? 1 : 0));
        return this._runTask(A(i, o), B.trailingFunctionArgument(arguments));
      }),
      (B.prototype.exec = function(t) {
        const e = {
          commands: [],
          format: "utf-8",
          parser() {
            "function" === typeof t && t();
          }
        };
        return this._runTask(e);
      }),
      (B.prototype.then = function(t, e) {
        return this._promise.then.apply(this._promise, arguments);
      }),
      (B.prototype.catch = function(t) {
        return this._promise.catch(t);
      }),
      (B.prototype.log = function(t, e) {
        var n = B.trailingFunctionArgument(arguments),
          r = (n === e ? t : null) || {},
          i = r.splitter || $("ListLogSummary").SPLITTER,
          o = r.format || {
            hash: "%H",
            date: !1 === r.strictDate ? "%ai" : "%aI",
            message: "%s",
            refs: "%D",
            body: r.multiLine ? "%B" : "%b",
            author_name: "%aN",
            author_email: "%ae"
          },
          s = !1 !== r.symmetric ? "..." : "..",
          u = Object.keys(o),
          a = u
            .map(function(t) {
              return o[t];
            })
            .join(i),
          c = [],
          l = [
            "log",
            "--pretty=format:" +
              $("ListLogSummary").START_BOUNDARY +
              a +
              $("ListLogSummary").COMMIT_BOUNDARY
          ];
        return (
          Array.isArray(r)
            ? ((l = l.concat(r)), (r = {}))
            : ("string" !== typeof arguments[0] &&
                "string" !== typeof arguments[1]) ||
              (this._logger.warn(
                "Git#log: supplying to or from as strings is now deprecated, switch to an options configuration object"
              ),
              (r = { from: arguments[0], to: arguments[1] })),
          (r.n || r["max-count"]) &&
            l.push("--max-count=" + (r.n || r["max-count"])),
          r.from && r.to && l.push(r.from + s + r.to),
          r.file && c.push("--follow", t.file),
          "splitter n max-count file from to --pretty format symmetric multiLine strictDate"
            .split(" ")
            .forEach(function(t) {
              delete r[t];
            }),
          B._appendOptions(l, r),
          this._run(l.concat(c), n, {
            parser: B.responseParser("ListLogSummary", [i, u])
          })
        );
      }),
      (B.prototype.clearQueue = function() {
        return this;
      }),
      (B.prototype.checkIgnore = function(t, e) {
        var n = B.trailingFunctionArgument(arguments),
          r = ["check-ignore"];
        return (
          n !== t && (r = r.concat(t)),
          this._run(r, function(t, e) {
            n && n(t, !t && G(e));
          })
        );
      }),
      (B.prototype.checkIsRepo = function(t) {
        return this._run(
          ["rev-parse", "--is-inside-work-tree"],
          function(e, n) {
            t && t(e, "true" === String(n).trim());
          },
          {
            onError: function(t, e, n, r) {
              if (
                128 === t &&
                /(Not a git repository|Kein Git-Repository)/i.test(e)
              )
                return n(!1);
              r(e);
            }
          }
        );
      }),
      (B.prototype._rm = function(t, e, n) {
        var r = [].concat(t),
          i = ["rm", e];
        return (
          i.push.apply(i, r),
          this._run(i, B.trailingFunctionArgument(arguments))
        );
      }),
      (B.prototype._run = function(t, e, n) {
        const r = Object.assign(
          {
            concatStdErr: !1,
            onError: void 0,
            format: "utf-8",
            parser: t => t
          },
          n || {},
          { commands: t }
        );
        return this._runTask(r, e);
      }),
      (B.prototype._runTask = function(t, e) {
        return b(t, (this._promise = this._executor.push(t)), e), this;
      }),
      (B.fail = function(t, e, n) {
        t._logger.error(e),
          t.clearQueue(),
          "function" === typeof n && n.call(t, e, null);
      }),
      (B.trailingFunctionArgument = function(t) {
        return a(t[t.length - 1]);
      }),
      (B.trailingUserFunctionArgument = function(t) {
        return g(t[t.length - 1], m);
      }),
      (B.trailingOptionsArgument = function(t) {
        const e = l(t[t.length - 1]),
          n = t[t.length - (e ? 2 : 1)];
        return g(n, f) || null;
      }),
      (B.trailingArrayArgument = function(t) {
        const e = l(t[t.length - 1]),
          n = t[t.length - (e ? 2 : 1)];
        return g(n, c) || [];
      }),
      (B.getTrailingOptions = function(t, e) {
        var n = [];
        return (
          e && t.length && p(t[0]) && n.push(t[0]),
          B._appendOptions(n, B.trailingOptionsArgument(t)),
          n.push.apply(n, B.trailingArrayArgument(t)),
          n
        );
      }),
      (B._appendOptions = function(t, e) {
        null !== e &&
          Object.keys(e).forEach(function(n) {
            var r = e[n];
            "string" === typeof r ? t.push(n + "=" + r) : t.push(n);
          });
      }),
      (B.responseParser = function(t, e) {
        const n = $(t);
        return function(t) {
          return n.parse.apply(n, [t].concat(void 0 === e ? [] : e));
        };
      }),
      (B.exception = function(t, e, n) {
        const r = e instanceof Error ? e : new Error(e);
        throw ("function" === typeof n && n(r), r);
      }),
      (t.exports = B);
  },
  function(t, e) {
    t.exports = require("fs");
  },
  function(t, e, n) {
    t.exports = {
      CommitSummary: n(21),
      DiffSummary: n(7),
      FetchSummary: n(22),
      ListLogSummary: n(23),
      MergeSummary: n(24),
      MoveSummary: n(25),
      PullSummary: n(8)
    };
  },
  function(t, e) {
    function n() {
      (this.branch = ""),
        (this.commit = ""),
        (this.summary = { changes: 0, insertions: 0, deletions: 0 }),
        (this.author = null);
    }
    t.exports = n;
    var r = /\[([^\s]+) ([^\]]+)/,
      i = /\s*Author:\s(.+)/i;
    n.parse = function(t) {
      var e = t.trim().split("\n"),
        o = new n();
      return (
        (function(t, e) {
          e && ((t.branch = e[1]), (t.commit = e[2]));
        })(o, r.exec(e.shift())),
        i.test(e[0]) &&
          (function(t, e) {
            var n = e[1].split("<"),
              r = n.pop();
            r.indexOf("@") <= 0 ||
              (t.author = {
                email: r.substr(0, r.length - 1),
                name: n.join("<").trim()
              });
          })(o, i.exec(e.shift())),
        (function(t, e) {
          t.branch &&
            e &&
            ((t.summary.changes = parseInt(e[1], 10) || 0),
            (t.summary.insertions = parseInt(e[2], 10) || 0),
            (t.summary.deletions = parseInt(e[3], 10) || 0));
        })(o, /(\d+)[^,]*(?:,\s*(\d+)[^,]*)?(?:,\s*(\d+))?/g.exec(e.shift())),
        o
      );
    };
  },
  function(t, e, n) {
    "use strict";
    function r(t) {
      (this.raw = t),
        (this.remote = null),
        (this.branches = []),
        (this.tags = []);
    }
    (r.parsers = [
      [
        /From (.+)$/,
        function(t, e) {
          t.remote = e[0];
        }
      ],
      [
        /\* \[new branch\]\s+(\S+)\s*\-> (.+)$/,
        function(t, e) {
          t.branches.push({ name: e[0], tracking: e[1] });
        }
      ],
      [
        /\* \[new tag\]\s+(\S+)\s*\-> (.+)$/,
        function(t, e) {
          t.tags.push({ name: e[0], tracking: e[1] });
        }
      ]
    ]),
      (r.parse = function(t) {
        var e = new r(t);
        return (
          String(t)
            .trim()
            .split("\n")
            .forEach(function(t) {
              var n = t.trim();
              r.parsers.some(function(t) {
                var r = t[0].exec(n);
                if (r) return t[1](e, r.slice(1)), !0;
              });
            }),
          e
        );
      }),
      (t.exports = r);
  },
  function(t, e, n) {
    t.exports = i;
    var r = n(7);
    function i(t) {
      (this.all = t),
        (this.latest = (t.length && t[0]) || null),
        (this.total = t.length);
    }
    function o(t, e) {
      for (var n = 0; n < e.length; n++) this[e[n]] = t[n] || "";
    }
    (i.prototype.all = null),
      (i.prototype.latest = null),
      (i.prototype.total = 0),
      (o.prototype.diff = null),
      (i.START_BOUNDARY = "òòòòòò "),
      (i.COMMIT_BOUNDARY = " òò"),
      (i.SPLITTER = " ò "),
      (i.parse = function(t, e, n) {
        return (
          (n = n || [
            "hash",
            "date",
            "message",
            "refs",
            "author_name",
            "author_email"
          ]),
          new i(
            t
              .trim()
              .split(i.START_BOUNDARY)
              .filter(function(t) {
                return !!t.trim();
              })
              .map(function(t) {
                var s = t.trim().split(i.COMMIT_BOUNDARY),
                  u = new o(s[0].trim().split(e), n);
                return (
                  s.length > 1 && s[1].trim() && (u.diff = r.parse(s[1])), u
                );
              })
          )
        );
      });
  },
  function(t, e, n) {
    (t.exports = o), (t.exports.MergeConflict = i);
    var r = n(8);
    function i(t, e, n) {
      (this.reason = t), (this.file = e), n && (this.meta = n);
    }
    function o() {
      r.call(this), (this.conflicts = []), (this.merges = []);
    }
    (i.prototype.meta = null),
      (i.prototype.toString = function() {
        return this.file + ":" + this.reason;
      }),
      (o.prototype = Object.create(r.prototype)),
      (o.prototype.result = "success"),
      (o.prototype.toString = function() {
        return this.conflicts.length
          ? "CONFLICTS: " + this.conflicts.join(", ")
          : "OK";
      }),
      Object.defineProperty(o.prototype, "failed", {
        get: function() {
          return this.conflicts.length > 0;
        }
      }),
      (o.parsers = [
        {
          test: /^Auto-merging\s+(.+)$/,
          handle: function(t, e) {
            e.merges.push(t[1]);
          }
        },
        {
          test: /^CONFLICT\s+\((.+)\): Merge conflict in (.+)$/,
          handle: function(t, e) {
            e.conflicts.push(new i(t[1], t[2]));
          }
        },
        {
          test: /^CONFLICT\s+\((.+\/delete)\): (.+) deleted in (.+) and/,
          handle: function(t, e) {
            e.conflicts.push(new i(t[1], t[2], { deleteRef: t[3] }));
          }
        },
        {
          test: /^CONFLICT\s+\((.+)\):/,
          handle: function(t, e) {
            e.conflicts.push(new i(t[1], null));
          }
        },
        {
          test: /^Automatic merge failed;\s+(.+)$/,
          handle: function(t, e) {
            e.reason = e.result = t[1];
          }
        }
      ]),
      (o.parse = function(t) {
        let e = new o();
        t.trim()
          .split("\n")
          .forEach(function(t) {
            for (var n = 0, r = o.parsers.length; n < r; n++) {
              let r = o.parsers[n];
              var i = r.test.exec(t);
              if (i) {
                r.handle(i, e);
                break;
              }
            }
          });
        let n = r.parse(t);
        return n.summary.changes && Object.assign(e, n), e;
      });
  },
  function(t, e) {
    function n() {
      (this.moves = []), (this.sources = {});
    }
    (t.exports = n),
      (n.SUMMARY_REGEX = /^Renaming (.+) to (.+)$/),
      (n.parse = function(t) {
        for (
          var e, r = t.split("\n"), i = new n(), o = 0, s = r.length;
          o < s;
          o++
        )
          (e = n.SUMMARY_REGEX.exec(r[o].trim())) &&
            i.moves.push({ from: e[1], to: e[2] });
        return i;
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(2);
    class i {
      constructor(t) {
        (this.dryRun = t),
          (this.paths = []),
          (this.files = []),
          (this.folders = []);
      }
    }
    e.CleanResponse = i;
    const o = /^[a-z]+\s*/i,
      s = /^[a-z]+\s+[a-z]+\s*/i,
      u = /\/$/;
    e.cleanSummaryParser = function(t, e) {
      const n = new i(t),
        a = t ? s : o;
      return (
        r.toLinesWithContent(e, !0).forEach(t => {
          const e = t.replace(a, "");
          n.paths.push(e), (u.test(e) ? n.folders : n.files).push(e);
        }),
        n
      );
    };
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.filterType = function(t, ...e) {
        return e.some(e => e(t)) ? t : void 0;
      }),
      (e.filterArray = t => Array.isArray(t)),
      (e.filterPrimitives = t => /number|string|boolean/.test(typeof t)),
      (e.filterString = t => "string" === typeof t),
      (e.filterPlainObject = t =>
        !!t && "[object Object]" === Object.prototype.toString.call(t)),
      (e.filterFunction = t => "function" === typeof t);
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (function(t) {
        (t[(t.SUCCESS = 0)] = "SUCCESS"), (t[(t.ERROR = 1)] = "ERROR");
      })(e.ExitCodes || (e.ExitCodes = {}));
  },
  function(t, e, n) {
    "use strict";
    var r =
      (this && this.__awaiter) ||
      function(t, e, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(t) {
            try {
              a(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            try {
              a(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function(t) {
                      t(e);
                    })).then(s, u);
          }
          a((r = r.apply(t, e || [])).next());
        });
      };
    Object.defineProperty(e, "__esModule", { value: !0 });
    const i = n(12),
      o = n(1),
      s = n(0);
    e.GitExecutor = class {
      constructor(t = "git", e, n, r) {
        (this.binary = t),
          (this.cwd = e),
          (this.env = n),
          (this.outputHandler = r),
          (this._chain = Promise.resolve());
      }
      push(t) {
        return (this._chain = this._chain.then(() =>
          r(this, void 0, void 0, function*() {
            try {
              if (s.isEmptyTask(t)) return t.parser("");
              const e = yield this.gitResponse(
                  this.binary,
                  t.commands,
                  this.outputHandler
                ),
                n = yield this.handleTaskData(t, e);
              return s.isBufferTask(t)
                ? t.parser(n)
                : t.parser(n.toString(t.format));
            } catch (e) {
              if (((this._chain = Promise.resolve()), e instanceof o.GitError))
                throw ((e.task = t), e);
              throw new o.GitError(t, e && String(e));
            }
          })
        ));
      }
      handleTaskData(
        { onError: t, concatStdErr: e },
        { exitCode: n, stdOut: r, stdErr: i }
      ) {
        return new Promise((o, s) =>
          n && i.length && t
            ? t(
                n,
                Buffer.concat([...(e ? r : []), ...i]).toString("utf-8"),
                t => {
                  o(Buffer.from(Buffer.isBuffer(t) ? t : String(t)));
                },
                s
              )
            : n && i.length
            ? s(Buffer.concat(i).toString("utf-8"))
            : (e && r.push(...i), void o(Buffer.concat(r)))
        );
      }
      gitResponse(t, e, n) {
        return r(this, void 0, void 0, function*() {
          const r = { cwd: this.cwd, env: this.env, windowsHide: !0 };
          return new Promise(o => {
            const s = [],
              u = [];
            let a = !1;
            function c(t) {
              (a || u.length || s.length) &&
                (o({ stdOut: s, stdErr: u, exitCode: t }), (a = !0)),
                a || ((a = !0), setTimeout(() => c(t), 50));
            }
            const l = i.spawn(t, e, r);
            l.stdout.on("data", t => s.push(t)),
              l.stderr.on("data", t => u.push(t)),
              l.on("error", t => u.push(Buffer.from(String(t.stack), "ascii"))),
              l.on("close", t => c(t)),
              l.on("exit", c),
              n && n(t[0], l.stdout, l.stderr);
          });
        });
      }
    };
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    e.GitLogger = class {
      constructor(t) {
        this._silentLogging = t;
      }
      silent(t = !1) {
        this._silentLogging = t;
      }
      error(t) {
        this._silentLogging || console.error(t);
      }
      warn(t) {
        this._silentLogging || console.warn(t);
      }
    };
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(3),
      i = n(32),
      o = n(33);
    function s(t) {
      const e = ["-d", "-D", "--delete"];
      return t.some(t => e.includes(t));
    }
    (e.containsDeleteBranchCommand = s),
      (e.branchTask = function(t) {
        const e = s(t),
          n = ["branch", ...t];
        return (
          1 === n.length && n.push("-a"),
          n.includes("-v") || n.splice(1, 0, "-v"),
          {
            format: "utf-8",
            commands: n,
            parser: t =>
              e ? o.parseBranchDeletions(t).all[0] : i.parseBranchSummary(t)
          }
        );
      }),
      (e.branchLocalTask = function() {
        return {
          format: "utf-8",
          commands: ["branch", "-v"],
          parser: t => i.parseBranchSummary(t)
        };
      }),
      (e.deleteBranchesTask = function(t, e = !1) {
        return {
          format: "utf-8",
          commands: ["branch", "-v", e ? "-D" : "-d", ...t],
          parser: t => o.parseBranchDeletions(t),
          onError(t, e, n, r) {
            if (!o.hasBranchDeletionError(e, t)) return r(e);
            n(e);
          },
          concatStdErr: !0
        };
      }),
      (e.deleteBranchTask = function(t, e = !1) {
        const n = e => o.parseBranchDeletions(e).branches[t];
        return {
          format: "utf-8",
          commands: ["branch", "-v", e ? "-D" : "-d", t],
          parser: n,
          onError(t, e, i, s) {
            if (!o.hasBranchDeletionError(e, t)) return s(e);
            throw new r.GitResponseError(n(e), e);
          },
          concatStdErr: !0
        };
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    class r {
      constructor() {
        (this.all = []),
          (this.branches = {}),
          (this.current = ""),
          (this.detached = !1);
      }
      push(t, e, n, r, i) {
        t && ((this.detached = e), (this.current = n)),
          this.all.push(n),
          (this.branches[n] = { current: t, name: n, commit: r, label: i });
      }
    }
    (e.BranchSummaryResult = r),
      (e.detachedRegex = /^(\*?\s+)\((?:HEAD )?detached (?:from|at) (\S+)\)\s+([a-z0-9]+)\s(.*)$/),
      (e.branchRegex = /^(\*?\s+)(\S+)\s+([a-z0-9]+)\s(.*)$/),
      (e.parseBranchSummary = function(t) {
        const n = new r();
        return (
          t.split("\n").forEach(function(t) {
            let r = !0,
              i = e.detachedRegex.exec(t);
            i || ((r = !1), (i = e.branchRegex.exec(t))),
              i && n.push("*" === i[1].charAt(0), r, i[2], i[3], i[4]);
          }),
          n
        );
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(2);
    class i {
      constructor() {
        (this.all = []), (this.branches = {}), (this.errors = []);
      }
      get success() {
        return !this.errors.length;
      }
    }
    e.BranchDeletionBatch = i;
    class o {
      constructor(t, e) {
        (this.branch = t), (this.hash = e);
      }
      get success() {
        return null !== this.hash;
      }
    }
    (e.BranchDeletion = o),
      (e.deleteSuccessRegex = /(\S+)\s+\(\S+\s([^)]+)\)/),
      (e.deleteErrorRegex = /^error[^']+'([^']+)'/m),
      (e.hasBranchDeletionError = function(t, n = r.ExitCodes.ERROR) {
        return e.deleteErrorRegex.test(t) && n === r.ExitCodes.ERROR;
      }),
      (e.parseBranchDeletions = function(t) {
        const n = new i();
        return (
          t
            .trim()
            .split("\n")
            .forEach(t => {
              const r = (function(t) {
                const n =
                  e.deleteSuccessRegex.exec(t) || e.deleteErrorRegex.exec(t);
                return n && new o(n[1], (n.length > 1 && n[2]) || null);
              })(t);
              r &&
                (n.all.push((n.branches[r.branch] = r)),
                r.success || n.errors.push(r));
            }),
          n
        );
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(4),
      i = n(2);
    e.taskCallback = function(t, e, n = i.NOOP) {
      e.then(
        t => {
          n(null, t);
        },
        e => {
          if ((null === e || void 0 === e ? void 0 : e.task) === t) {
            if (e instanceof r.GitResponseError)
              return n(
                (function(t) {
                  let e = t => {
                    console.warn(
                      `simple-git deprecation notice: accessing GitResponseError.${t} should be GitResponseError.git.${t}`
                    ),
                      (e = i.NOOP);
                  };
                  return Object.create(
                    t,
                    Object.getOwnPropertyNames(t.git).reduce(function(n, r) {
                      if (r in t) return n;
                      return (
                        (n[r] = {
                          enumerable: !1,
                          configurable: !1,
                          get: () => (e(r), t.git[r])
                        }),
                        n
                      );
                    }, {})
                  );
                })(e)
              );
            n(e);
          }
        }
      );
    };
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(36);
    (e.addConfigTask = function(t, e, n = !1) {
      const r = ["config", "--local"];
      return (
        n && r.push("--add"),
        r.push(t, e),
        { commands: r, format: "utf-8", parser: t => t }
      );
    }),
      (e.listConfigTask = function() {
        return {
          commands: ["config", "--list", "--show-origin", "--null"],
          format: "utf-8",
          parser: t => r.configListParser(t)
        };
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(11);
    class i {
      constructor() {
        (this.files = []), (this.values = Object.create(null));
      }
      get all() {
        return (
          this._all ||
            (this._all = Object.assign(
              {},
              ...this.files.map(t => this.values[t])
            )),
          this._all
        );
      }
      addFile(t) {
        if (!(t in this.values)) {
          const e = r.last(this.files);
          (this.values[t] = e ? Object.create(this.values[e]) : {}),
            this.files.push(t);
        }
        return this.values[t];
      }
      addValue(t, e, n) {
        const r = this.addFile(t);
        r.hasOwnProperty(e)
          ? Array.isArray(r[e])
            ? r[e].push(n)
            : (r[e] = [r[e], n])
          : (r[e] = n),
          (this._all = void 0);
      }
    }
    (e.ConfigList = i),
      (e.configListParser = function(t) {
        const e = new i(),
          n = t.split("\0");
        for (let t = 0, i = n.length - 1; t < i; ) {
          const i = n[t++].replace(/^(file):/, ""),
            [o, s] = r.splitOn(n[t++], "\n");
          e.addValue(i, o, s);
        }
        return e;
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(0),
      i = n(38);
    (e.addRemoteTask = function(t, e, n = []) {
      return r.straightThroughStringTask(["remote", "add", ...n, t, e]);
    }),
      (e.getRemotesTask = function(t) {
        const e = ["remote"];
        return (
          t && e.push("-v"),
          {
            commands: e,
            format: "utf-8",
            parser: t ? i.parseGetRemotesVerbose : i.parseGetRemotes
          }
        );
      }),
      (e.listRemotesTask = function(t = []) {
        const e = [...t];
        return (
          "ls-remote" !== e[0] && e.unshift("ls-remote"),
          r.straightThroughStringTask(e)
        );
      }),
      (e.remoteTask = function(t = []) {
        const e = [...t];
        return (
          "remote" !== e[0] && e.unshift("remote"),
          r.straightThroughStringTask(e)
        );
      }),
      (e.removeRemoteTask = function(t) {
        return r.straightThroughStringTask(["remote", "remove", t]);
      });
  },
  function(t, e, n) {
    "use strict";
    function r(t, e) {
      t.split("\n").forEach(t => {
        const n = t.trim();
        n && n && e(n.split(/\s+/));
      });
    }
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.parseGetRemotes = function(t) {
        const e = {};
        return r(t, ([t]) => (e[t] = { name: t })), Object.values(e);
      }),
      (e.parseGetRemotesVerbose = function(t) {
        const e = {};
        return (
          r(t, ([t, n, r]) => {
            e.hasOwnProperty(t) ||
              (e[t] = { name: t, refs: { fetch: "", push: "" } }),
              r && n && (e[t].refs[r.replace(/[^a-z]/g, "")] = n);
          }),
          Object.values(e)
        );
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(40);
    e.statusTask = function() {
      return {
        format: "utf-8",
        commands: ["status", "--porcelain", "-b", "-u"],
        parser: t => r.parseStatusSummary(t)
      };
    };
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(41);
    class i {
      constructor() {
        (this.not_added = []),
          (this.conflicted = []),
          (this.created = []),
          (this.deleted = []),
          (this.modified = []),
          (this.renamed = []),
          (this.files = []),
          (this.staged = []),
          (this.ahead = 0),
          (this.behind = 0),
          (this.current = null),
          (this.tracking = null);
      }
      isClean() {
        return !this.files.length;
      }
    }
    function o(t) {
      let n = t.trim().match(/(..?)(\s+)(.*)/);
      if (((n && n[1].trim()) || (n = t.trim().match(/(..?)\s+(.*)/)), !n))
        return;
      let r = n[1];
      return (
        n[2].length > 1 && (r += " "),
        1 === r.length && 1 === n[2].length && (r = " " + r),
        {
          raw: r,
          code: r.trim(),
          index: r.charAt(0),
          workingDir: r.charAt(1),
          handler: e.StatusSummaryParsers[r.trim()],
          path: n[3]
        }
      );
    }
    (e.StatusSummary = i),
      (e.StatusSummaryParsers = {
        "##": function(t, e) {
          let n;
          (n = /ahead (\d+)/.exec(t)),
            (e.ahead = (n && +n[1]) || 0),
            (n = /behind (\d+)/.exec(t)),
            (e.behind = (n && +n[1]) || 0),
            (n = /^(.+?(?=(?:\.{3}|\s|$)))/.exec(t)),
            (e.current = n && n[1]),
            (n = /\.{3}(\S*)/.exec(t)),
            (e.tracking = n && n[1]);
        },
        "??": function(t, e) {
          e.not_added.push(t);
        },
        A: function(t, e) {
          e.created.push(t);
        },
        AM: function(t, e) {
          e.created.push(t);
        },
        D: function(t, e) {
          e.deleted.push(t);
        },
        M: function(t, e, n) {
          e.modified.push(t), "M" === n && e.staged.push(t);
        },
        R: function(t, e) {
          const n = /^(.+) -> (.+)$/.exec(t) || [null, t, t];
          e.renamed.push({ from: String(n[1]), to: String(n[2]) });
        },
        UU: function(t, e) {
          e.conflicted.push(t);
        }
      }),
      (e.StatusSummaryParsers.MM = e.StatusSummaryParsers.M),
      (e.StatusSummaryParsers.AA = e.StatusSummaryParsers.UU),
      (e.StatusSummaryParsers.UD = e.StatusSummaryParsers.UU),
      (e.StatusSummaryParsers.DU = e.StatusSummaryParsers.UU),
      (e.StatusSummaryParsers.DD = e.StatusSummaryParsers.UU),
      (e.StatusSummaryParsers.AU = e.StatusSummaryParsers.UU),
      (e.StatusSummaryParsers.UA = e.StatusSummaryParsers.UU),
      (e.parseStatusSummary = function(t) {
        let e;
        const n = t.trim().split("\n"),
          s = new i();
        for (let t = 0, i = n.length; t < i; t++)
          (e = o(n[t])),
            e &&
              (e.handler && e.handler(e.path, s, e.index, e.workingDir),
              "##" !== e.code &&
                s.files.push(
                  new r.FileStatusSummary(e.path, e.index, e.workingDir)
                ));
        return s;
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.fromPathRegex = /^(.+) -> (.+)$/);
    e.FileStatusSummary = class {
      constructor(t, n, r) {
        if (
          ((this.path = t),
          (this.index = n),
          (this.working_dir = r),
          "R" === n + r)
        ) {
          const n = e.fromPathRegex.exec(t) || [null, t, t];
          (this.from = n[1] || ""), (this.path = n[2] || "");
        }
      }
    };
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(0);
    function i(t) {
      const e = [...t];
      return (
        "submodule" !== e[0] && e.unshift("submodule"),
        r.straightThroughStringTask(e)
      );
    }
    (e.addSubModuleTask = function(t, e) {
      return i(["add", t, e]);
    }),
      (e.initSubModuleTask = function(t) {
        return i(["init", ...t]);
      }),
      (e.subModuleTask = i),
      (e.updateSubModuleTask = function(t) {
        return i(["update", ...t]);
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const r = n(44);
    (e.tagListTask = function(t = []) {
      const e = t.some(t => /^--sort=/.test(t));
      return {
        format: "utf-8",
        commands: ["tag", "-l", ...t],
        parser: t => r.parseTagList(t, e)
      };
    }),
      (e.addTagTask = function(t) {
        return {
          format: "utf-8",
          commands: ["tag", t],
          parser: () => ({ name: t })
        };
      }),
      (e.addAnnotatedTagTask = function(t, e) {
        return {
          format: "utf-8",
          commands: ["tag", "-a", "-m", e, t],
          parser: () => ({ name: t })
        };
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    class r {
      constructor(t, e) {
        (this.all = t), (this.latest = e);
      }
    }
    function i(t, e) {
      return t === e ? 0 : t > e ? 1 : -1;
    }
    function o(t) {
      return t.trim();
    }
    function s(t) {
      return (
        ("string" === typeof t && parseInt(t.replace(/^\D+/g, ""), 10)) || 0
      );
    }
    (e.TagList = r),
      (e.parseTagList = function(t, e = !1) {
        const n = t
          .split("\n")
          .map(o)
          .filter(Boolean);
        e ||
          n.sort(function(t, e) {
            const n = t.split("."),
              r = e.split(".");
            if (1 === n.length || 1 === r.length)
              return (function(t, e) {
                const n = isNaN(t),
                  r = isNaN(e);
                if (n !== r) return n ? 1 : -1;
                return n ? i(t, e) : 0;
              })(s(n[0]), s(r[0]));
            for (let t = 0, e = Math.max(n.length, r.length); t < e; t++) {
              const e = i(s(n[t]), s(r[t]));
              if (e) return e;
            }
            return 0;
          });
        const u = e ? n[0] : [...n].reverse().find(t => t.indexOf(".") >= 0);
        return new r(n, u);
      });
  },
  function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.parseCheckIgnore = t =>
        t
          .split(/\n/g)
          .map(t => t.trim())
          .filter(t => !!t));
  },
  function(t, e, n) {
    t.exports = {
      buffer: function() {
        return n(47).Buffer;
      },
      childProcess: function() {
        return n(12);
      },
      exists: n(6)
    };
  },
  function(t, e) {
    t.exports = require("buffer");
  }
]);
