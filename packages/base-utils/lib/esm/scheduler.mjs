// packages/base-utils/src/scheduler.ts
var Scheduler = class {
  queueList = [];
  stop = false;
  options = {
    delay: 0,
    checkRunAfterAdd: true,
    concurrency: 1,
    cluster: false
    // node only
  };
  get size() {
    const { queueList: list } = this;
    return list.length === 1 ? list[0].map.size : list.map((l) => l.map.size);
  }
  get pause() {
    return this.queueList.every((item) => item.pause);
  }
  constructor(options = {}) {
    this.optionInit(options);
    if (this.options.concurrency < 1) {
      throw new Error("\u5E76\u53D1\u6570\u5FC5\u987B\u5927\u4E8E0");
    }
    for (; ; ) {
      if (this.queueList.length === this.options.concurrency)
        break;
      this.queueList.push({
        pause: true,
        map: /* @__PURE__ */ new Map()
      });
    }
  }
  optionInit(options) {
    for (const [key, item] of Object.entries(options)) {
      this.options[key] = item;
    }
  }
  pickShortestQueue() {
    let shortestQueue = this.queueList[0];
    for (const queue of this.queueList) {
      if (queue.map.size < shortestQueue.map.size) {
        shortestQueue = queue;
      }
    }
    return shortestQueue;
  }
  add(task) {
    const taskRecord = {
      action: () => new Promise(() => {
      }),
      resolve: (value) => {
      },
      reject: (err) => {
      }
    };
    const result = new Promise((resolve, reject) => {
      taskRecord.resolve = resolve;
      taskRecord.reject = reject;
    });
    const action = async () => {
      const r = await task();
      taskRecord.resolve(r);
    };
    taskRecord.action = action;
    const shortestQueue = this.pickShortestQueue();
    shortestQueue.map.set(Symbol(), taskRecord);
    if (this.options.checkRunAfterAdd && this.pause) {
      this.run();
    }
    return result;
  }
  async run() {
    for (const record of this.queueList) {
      this.runQueue(record);
    }
  }
  async runQueue(queueRecord) {
    queueRecord.pause = false;
    const queue = queueRecord.map.entries();
    for (; ; ) {
      if (this.stop)
        break;
      if (queueRecord.map.size === 0)
        break;
      const item = queue.next();
      if (!item)
        continue;
      const [key, record] = item.value;
      const { action, resolve, reject } = record;
      await action().then(resolve).catch(reject);
      queueRecord.map.delete(key);
      if (this.options.delay)
        await this.wait(this.options.delay);
    }
    if (queueRecord.map.size !== 0) {
      await this.runQueue(queueRecord);
    }
    queueRecord.pause = true;
  }
  wait = (time) => new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, time);
  });
  static wait = (time) => new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, time);
  });
};
export {
  Scheduler
};
