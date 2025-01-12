(() => {
  "use strict";
  var t = {};
  t.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })();
  const n = "NeverStarted",
    e = "Ended",
    s = "ConnectionLost",
    o = "ConnectionGained",
    c = "Ended",
    i = "IncomingMessage";
  class a {
    constructor(t, n, e) {
      a.baseInstance || (a.baseInstance = new r(e)),
        (this.contactId = t),
        (this.initialContactId = n),
        (this.status = null),
        (this.eventBus = new connect.EventBus()),
        (this.subscriptions = [
          a.baseInstance.onEnded(this.handleEnded.bind(this)),
          a.baseInstance.onConnectionGain(this.handleConnectionGain.bind(this)),
          a.baseInstance.onConnectionLost(this.handleConnectionLost.bind(this)),
          a.baseInstance.onMessage(this.handleMessage.bind(this)),
        ]);
    }
    start() {
      return a.baseInstance.start();
    }
    end() {
      this.eventBus.unsubscribeAll(),
        this.subscriptions.forEach((t) => t.unsubscribe()),
        (this.status = e);
    }
    getStatus() {
      return this.status || a.baseInstance.getStatus();
    }
    onEnded(t) {
      return this.eventBus.subscribe(c, t);
    }
    handleEnded() {
      this.eventBus.trigger(c, {});
    }
    onConnectionGain(t) {
      return this.eventBus.subscribe(o, t);
    }
    handleConnectionGain() {
      this.eventBus.trigger(o, {});
    }
    onConnectionLost(t) {
      return this.eventBus.subscribe(s, t);
    }
    handleConnectionLost() {
      this.eventBus.trigger(s, {});
    }
    onMessage(t) {
      return this.eventBus.subscribe(i, t);
    }
    handleMessage(t) {
      (t.InitialContactId !== this.initialContactId &&
        t.ContactId !== this.contactId) ||
        this.eventBus.trigger(i, t);
    }
  }
  a.baseInstance = null;
  class r {
    constructor(t) {
      (this.status = n),
        (this.eventBus = new connect.EventBus()),
        this.initWebsocketManager(t);
    }
    initWebsocketManager(t) {
      (this.websocketManager = t),
        this.websocketManager.subscribeTopics(["aws/task"]),
        (this.subscriptions = [
          this.websocketManager.onMessage(
            "aws/task",
            this.handleMessage.bind(this)
          ),
          this.websocketManager.onConnectionGain(
            this.handleConnectionGain.bind(this)
          ),
          this.websocketManager.onConnectionLost(
            this.handleConnectionLost.bind(this)
          ),
          this.websocketManager.onInitFailure(this.handleEnded.bind(this)),
        ]);
    }
    start() {
      return this.status === n && (this.status = "Starting"), Promise.resolve();
    }
    onEnded(t) {
      return this.eventBus.subscribe(c, t);
    }
    handleEnded() {
      (this.status = e), this.eventBus.trigger(c, {});
    }
    onConnectionGain(t) {
      return this.eventBus.subscribe(o, t);
    }
    handleConnectionGain() {
      (this.status = "Connected"), this.eventBus.trigger(o, {});
    }
    onConnectionLost(t) {
      return this.eventBus.subscribe(s, t);
    }
    handleConnectionLost() {
      (this.status = "ConnectionLost"), this.eventBus.trigger(s, {});
    }
    onMessage(t) {
      return this.eventBus.subscribe(i, t);
    }
    handleMessage(t) {
      let n;
      try {
        (n = JSON.parse(t.content)), this.eventBus.trigger(i, n);
      } catch (n) {
        connect.getLog().error("Wrong message format: %s", t);
      }
    }
    getStatus() {
      return this.status;
    }
  }
  const l = a,
    h = "INCOMING_MESSAGE",
    u = "TRANSFER_FAILED",
    d = "TRANSFER_SUCCEEDED",
    g = "TRANSFER_INITIATED",
    b = "CONNECTION_ESTABLISHED",
    p = "CONNECTION_BROKEN",
    C = "TASK_EXPIRING",
    T = "TASK_EXPIRED",
    E = {
      "application/vnd.amazonaws.connect.event.transfer.initiated": g,
      "application/vnd.amazonaws.connect.event.transfer.succeeded": d,
      "application/vnd.amazonaws.connect.event.transfer.failed": u,
      "application/vnd.amazonaws.connect.event.expire.warning": C,
      "application/vnd.amazonaws.connect.event.expire.complete": T,
    };
  class I {
    constructor(t) {
      (this.pubsub = new connect.EventBus()),
        (this.initialContactId = t.initialContactId),
        (this.contactId = t.contactId),
        (this.websocketManager = t.websocketManager);
    }
    subscribe(t, n) {
      this.pubsub.subscribe(t, n),
        connect
          .getLog()
          .info(
            connect.LogComponent.TASK,
            "Subscribed successfully to eventName: %s",
            t
          );
    }
    connect() {
      return this._initConnectionHelper().then(
        this._onConnectSuccess.bind(this),
        this._onConnectFailure.bind(this)
      );
    }
    getTaskDetails() {
      return {
        initialContactId: this.initialContactId,
        contactId: this.contactId,
      };
    }
    unsubscribeAll() {
      this.pubsub.unsubscribeAll(), this.connectionHelper.end();
    }
    _triggerEvent(t, n) {
      connect
        .getLog()
        .debug(
          connect.LogComponent.TASK,
          "Triggering event for subscribers: %s",
          t
        )
        .withObject({ data: n, taskDetails: this.getTaskDetails() }),
        this.pubsub.trigger(t, n);
    }
    _onConnectSuccess(t) {
      connect.getLog().info(connect.LogComponent.TASK, "Connect successful!");
      const n = { _debug: t, connectSuccess: !0, connectCalled: !0 };
      return this._triggerEvent(b, n), n;
    }
    _onConnectFailure(t) {
      const n = {
        _debug: t,
        connectSuccess: !1,
        connectCalled: !0,
        metadata: this.sessionMetadata,
      };
      return (
        connect
          .getLog()
          .error(connect.LogComponent.TASK, "Connect Failed")
          .withException(n),
        Promise.reject(n)
      );
    }
    _initConnectionHelper() {
      return (
        (this.connectionHelper = new l(
          this.contactId,
          this.initialContactId,
          this.websocketManager
        )),
        this.connectionHelper.onEnded(this._handleEndedConnection.bind(this)),
        this.connectionHelper.onConnectionLost(
          this._handleLostConnection.bind(this)
        ),
        this.connectionHelper.onConnectionGain(
          this._handleGainedConnection.bind(this)
        ),
        this.connectionHelper.onMessage(this._handleIncomingMessage.bind(this)),
        this.connectionHelper.start()
      );
    }
    _handleEndedConnection(t) {
      this._triggerEvent(p, t);
    }
    _handleGainedConnection(t) {
      this._triggerEvent(b, t);
    }
    _handleLostConnection(t) {
      this._triggerEvent("CONNECTION_LOST", t);
    }
    _handleIncomingMessage(t) {
      const n = t.ContentType;
      E[n] && this._triggerEvent(E[n], t), this._triggerEvent(h, t);
    }
  }
  class v {
    constructor(t) {
      this.controller = t;
    }
    onMessage(t) {
      this.controller.subscribe(h, t);
    }
    onTransferSucceeded(t) {
      this.controller.subscribe(d, t);
    }
    onTransferFailed(t) {
      this.controller.subscribe(u, t);
    }
    onTransferInitiated(t) {
      this.controller.subscribe(g, t);
    }
    onTaskExpiring(t) {
      this.controller.subscribe(C, t);
    }
    onTaskExpired(t) {
      this.controller.subscribe(T, t);
    }
    onConnectionBroken(t) {
      this.controller.subscribe(p, t);
    }
    onConnectionEstablished(t) {
      this.controller.subscribe(b, t);
    }
    connect(t) {
      return this.controller.connect(t);
    }
    cleanUp() {
      this.controller.unsubscribeAll();
    }
  }
  const A = {
      create: (t) => {
        const n = new I(t);
        return new v(n);
      },
    },
    k = connect.makeEnum(["URL", "EMAIL", "NUMBER", "STRING", "DATE"]);
  function m(t) {
    Object.keys(t).forEach((n) => {
      const e = (s = n).charAt(0).toUpperCase() + s.slice(1);
      var s;
      e !== n && ((t[e] = t[n]), delete t[n]),
        "References" === e && Object.values(t[e]).forEach((t) => m(t));
    });
  }
  (t.g.connect = t.g.connect || {}),
    (connect.TaskSession = A),
    connect.Agent.prototype.createTask ||
      (connect.Agent.prototype.createTask = function (t, n) {
        connect.assertNotNull(t, "Task contact object"),
          connect.assertNotNull(t.name, "Task name");
        var e = connect.core.getClient();
        t.taskTemplateId
          ? (t.endpoint &&
              ((t.quickConnectId = t.endpoint.endpointARN.split("/").pop()),
              delete t.endpoint),
            m(t),
            e.call(
              connect.TaskTemplatesClientMethods.CREATE_TEMPLATED_TASK,
              t,
              n
            ))
          : (connect.assertNotNull(t.endpoint, "Task endpoint"),
            (t.idempotencyToken = AWS.util.uuid.v4()),
            delete t.endpoint.endpointId,
            e.call(connect.ClientMethods.CREATE_TASK_CONTACT, t, n));
      }),
    connect.Agent.prototype.getTaskTemplate ||
      (connect.Agent.prototype.getTaskTemplate = function (t, n) {
        connect.assertNotNull(t, "Task template params"),
          connect.assertNotNull(t.id, "Task template id");
        var e = connect.core.getClient(),
          s = connect.core.getAgentDataProvider().getInstanceId();
        e.call(
          connect.TaskTemplatesClientMethods.GET_TASK_TEMPLATE,
          { instanceId: s, templateParams: t },
          n
        );
      }),
    connect.Agent.prototype.listTaskTemplates ||
      (connect.Agent.prototype.listTaskTemplates = function (t, n) {
        connect.assertNotNull(t, "Query params for listTaskTemplates");
        var e = connect.core.getClient(),
          s = connect.core.getAgentDataProvider().getInstanceId();
        e.call(
          connect.TaskTemplatesClientMethods.LIST_TASK_TEMPLATES,
          { instanceId: s, queryParams: t },
          n
        );
      }),
    connect.Agent.prototype.updateContact ||
      (connect.Agent.prototype.updateContact = function (t, n) {
        connect.assertNotNull(t, "Update for templated task"),
          connect.assertNotNull(t.contactId, "Task contact id");
        var e = connect.core.getClient();
        m(t), e.call(connect.TaskTemplatesClientMethods.UPDATE_CONTACT, t, n);
      }),
    (connect.ReferenceType = k);
})();
