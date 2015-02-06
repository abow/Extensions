var POV;!function(a){var b=function(){function a(a,b){this.completionRatios=a,this.durationRatios=b,this.completionRatios instanceof Array&&this.durationRatios instanceof Array||BABYLON.Tools.Error("Pace: ratios not arrays"),this.completionRatios.length!==this.durationRatios.length&&BABYLON.Tools.Error("Pace: ratio arrays not of equal length"),this.steps=this.completionRatios.length,0===this.steps&&BABYLON.Tools.Error("Pace: ratio arrays cannot be empty");for(var c,d,e=-1,f=0;f<this.steps;f++)c=this.completionRatios[f],d=this.durationRatios[f],(0>=c||0>=d)&&BABYLON.Tools.Error("Pace: ratios must be > 0"),(c>1||d>1)&&BABYLON.Tools.Error("Pace: ratios must be <= 1"),e>=d&&BABYLON.Tools.Error("Pace: durationRatios must be in increasing order"),e=d;(1!==c||1!==d)&&BABYLON.Tools.Error("Pace: final ratios must be 1"),this.incremetalCompletionBetweenSteps=[this.completionRatios[0]],this.incremetalDurationBetweenSteps=[this.durationRatios[0]];for(var f=1;f<this.steps;f++)this.incremetalCompletionBetweenSteps.push(this.completionRatios[f]-this.completionRatios[f-1]),this.incremetalDurationBetweenSteps.push(this.durationRatios[f]-this.durationRatios[f-1]);Object.freeze(this)}return a.prototype.getCompletionMilestone=function(a){if(0>=a)return 0;if(a>=1)return 1;for(var b=0;b<this.steps&&!(a<this.durationRatios[b]);b++);var c=b>0?this.completionRatios[b-1]:0,d=b>0?this.durationRatios[b-1]:0,e=(a-d)/this.incremetalDurationBetweenSteps[b];return c+e*this.incremetalCompletionBetweenSteps[b]},a.LINEAR=new a([1],[1]),a}();a.Pace=b}(POV||(POV={}));var POV;!function(a){var b=function(){function b(c,d,e,f,g){void 0===g&&(g=a.Pace.LINEAR),this._milliDuration=c,this._millisBefore=d,this.movePOV=e,this.rotatePOV=f,this._pace=g,this._startTime=-1,this._currentDurationRatio=b._COMPLETE,this._milliDuration<=0&&BABYLON.Tools.Error("MotionEvent: milliDuration must > 0"),this.setProratedWallClocks(1,!1)}return b.prototype.activate=function(a){void 0===a&&(a=0),this._startTime=BABYLON.Tools.Now,a>0&&(a/=5,this._startTime-=a<this._milliDuration/10?a:this._milliDuration/10),this._currentDurationRatio=this._syncPartner?b._BLOCKED:this._proratedMillisBefore>0?b._WAITING:b._READY},b.prototype.getCompletionMilestone=function(){if(this._currentDurationRatio===b._COMPLETE)return b._COMPLETE;if(this._currentDurationRatio===b._BLOCKED){if(!this._syncPartner.isBlocked())return b._BLOCKED;this._startTime=BABYLON.Tools.Now,this._currentDurationRatio=b._WAITING,this._syncPartner.syncReady(this._startTime)}var a=BABYLON.Tools.Now-this._startTime;if(this._currentDurationRatio===b._WAITING){if(a-=this._proratedMillisBefore,!(a>=0))return b._WAITING;this._startTime=BABYLON.Tools.Now-a}return this._currentDurationRatio=a/this._proratedMilliDuration,this._currentDurationRatio>b._COMPLETE&&(this._currentDurationRatio=b._COMPLETE),this._pace.getCompletionMilestone(this._currentDurationRatio)},b.prototype.resumePlay=function(){this._currentDurationRatio!==b._COMPLETE&&this._currentDurationRatio!==b._BLOCKED&&this._currentDurationRatio!==b._COMPLETE&&(this._startTime=BABYLON.Tools.Now-this._proratedMilliDuration*this._currentDurationRatio)},b.prototype.setSyncPartner=function(a){this._syncPartner=a},b.prototype.syncReady=function(a){this._startTime=a,this._currentDurationRatio=b._WAITING},b.prototype.isBlocked=function(){return this._currentDurationRatio===b._BLOCKED},b.prototype.isWaiting=function(){return this._currentDurationRatio===b._WAITING},b.prototype.isComplete=function(){return this._currentDurationRatio===b._COMPLETE},b.prototype.isExecuting=function(){return this._currentDurationRatio>b._READY&&this._currentDurationRatio<b._COMPLETE},b.prototype.getMilliDuration=function(){return this._milliDuration},b.prototype.getMillisBefore=function(){return this._millisBefore},b.prototype.getPace=function(){return this._pace},b.prototype.getSyncPartner=function(){return this._syncPartner},b.prototype.setProratedWallClocks=function(a,b){this._proratedMilliDuration=this._milliDuration*a,this._proratedMillisBefore=this._millisBefore>0||!b?Math.abs(this._millisBefore)*a:0},Object.defineProperty(b,"BLOCKED",{get:function(){return b._BLOCKED},enumerable:!0,configurable:!0}),Object.defineProperty(b,"WAITING",{get:function(){return b._WAITING},enumerable:!0,configurable:!0}),Object.defineProperty(b,"READY",{get:function(){return b._READY},enumerable:!0,configurable:!0}),Object.defineProperty(b,"COMPLETE",{get:function(){return b._COMPLETE},enumerable:!0,configurable:!0}),b._BLOCKED=-20,b._WAITING=-10,b._READY=0,b._COMPLETE=1,b}();a.MotionEvent=b}(POV||(POV={}));var __extends=this.__extends||function(a,b){function d(){this.constructor=a}for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);d.prototype=b.prototype,a.prototype=new d},POV;!function(a){var b=function(a){function b(b,c,d,e){a.call(this,b,e),this._target=c,this._eSeries=d}return __extends(b,a),b.prototype.execute=function(){this._target.queueEventSeries(this._eSeries)},b}(BABYLON.Action);a.SeriesAction=b;var c=function(){function b(b,c,d){void 0===c&&(c=1),void 0===d&&(d=1),this._eventSeries=b,this._nRepeats=c,this._initialWallclockProrating=d,this._nEvents=this._eventSeries.length;for(var e=0;e<this._nEvents;e++)this._eventSeries[e]instanceof a.MotionEvent||this._eventSeries[e]instanceof BABYLON.Action||"function"!=typeof this._eventSeries[e]&&BABYLON.Tools.Error("EventSeries:  eventSeries elements must either be a MotionEvent, Action, or function");this._prorating=1!==this._initialWallclockProrating,1===this._nRepeats&&this._prorating&&BABYLON.Tools.Warn("EventSeries: clock prorating ignored when # of repeats is 1")}return b.prototype.hasMultipleParticipants=function(){return!1},b.prototype.activate=function(){this._indexInRun=-1,this._repeatCounter=0,this._proRatingThisRepeat=this._nRepeats>1?this._initialWallclockProrating:1,this.appyProrating()},b.prototype.hasMoreEvents=function(){return this._repeatCounter<this._nRepeats},b.prototype.nextEvent=function(){if(++this._indexInRun===this._nEvents){if(!(++this._repeatCounter<this._nRepeats))return null;this._indexInRun=0,this._prorating&&(this._proRatingThisRepeat=this._initialWallclockProrating+(1-this._initialWallclockProrating)*((this._repeatCounter+1)/this._nRepeats)),this.appyProrating()}return this._eventSeries[this._indexInRun]},b.prototype.appyProrating=function(){for(var b=0;b<this._nEvents;b++)this._eventSeries[b]instanceof a.MotionEvent&&this._eventSeries[b].setProratedWallClocks(this._proRatingThisRepeat,this._repeatCounter>0)},b}();a.EventSeries=c}(POV||(POV={}));var POV;!function(a){var b=function(){function a(a,b){if(void 0===b&&(b=!1),this._mesh=a,this.skipRegistration=b,this._queue=new Array,this._currentSeries=null,this._currentStepInSeries=null,this._endOfLastFrameTs=-1,this._doingRotation=!1,this._doingMovePOV=!1,this._activeLockedCamera=null,this._name="",this._lastResumeTime=0,this._instancePaused=!1,!b){var c=this;this._mesh.registerBeforeRender(function(){c._incrementallyMove()})}}return a.prototype._incrementallyMove=function(){if(!this._instancePaused&&!a._systemPaused&&(this._lastResumeTime<a._systemResumeTime&&(this._lastResumeTime=a._systemResumeTime,this.resumePlay()),null!==this._currentSeries&&this._currentSeries.hasMoreEvents()||this._nextEventSeries())){for(;null===this._currentStepInSeries||this._currentStepInSeries.isComplete();){var b=this._currentSeries.nextEvent(this._name);if(null===b)return;b instanceof BABYLON.Action?b.execute(BABYLON.ActionEvent.CreateNew(this._mesh)):"function"==typeof b?b.call():this._nextEvent(b)}if(this._currentStepInSeries.isExecuting()&&BABYLON.Tools.Now-this._endOfLastFrameTs>a.CHANGED_TABS_THRESHOLD&&(this.resumePlay(),this._ratioComplete=this._currentStepInSeries.getCompletionMilestone()),this._ratioComplete=this._currentStepInSeries.getCompletionMilestone(),!(this._ratioComplete<0)){if(this._doingRotation&&(this._mesh.rotation=BABYLON.Vector3.Lerp(this._rotationStartVec,this._rotationEndVec,this._ratioComplete)),this._doingMovePOV){if(this._doingRotation){var c=this._fullAmtRight*this._ratioComplete-this._amtRightSoFar,d=this._fullAmtUp*this._ratioComplete-this._amtUpSoFar,e=this._fullAmtForward*this._ratioComplete-this._amtForwardSoFar;this._mesh.movePOV(c,d,e),this._amtRightSoFar+=c,this._amtUpSoFar+=d,this._amtForwardSoFar+=e}else this._mesh.position=BABYLON.Vector3.Lerp(this._positionStartVec,this._positionEndVec,this._ratioComplete);null!==this._activeLockedCamera&&this._activeLockedCamera._getViewMatrix()}this._endOfLastFrameTs=BABYLON.Tools.Now}}},a.prototype.queueEventSeries=function(a){this._queue.push(a)},a.prototype._nextEventSeries=function(){var a=this._queue.length>0;return a?(this._currentSeries=this._queue.shift(),this._currentSeries.activate(this._name)):this._currentSeries=null,this._currentStepInSeries=null,a},a.prototype._nextEvent=function(b){var c=BABYLON.Tools.Now-this._endOfLastFrameTs;if(b.activate(c-this._endOfLastFrameTs<a.MAX_MILLIS_FOR_EVENT_LATE_START&&!this._currentSeries.hasMultipleParticipants()?c:0),this._currentStepInSeries=b,this._doingRotation=null!==b.rotatePOV,this._doingRotation&&(this._rotationStartVec=this._mesh.rotation,this._rotationEndVec=this._rotationStartVec.add(this._mesh.calcRotatePOV(b.rotatePOV.x,b.rotatePOV.y,b.rotatePOV.z))),this._doingMovePOV=null!==b.movePOV,this._doingMovePOV&&(this._fullAmtRight=b.movePOV.x,this._amtRightSoFar=0,this._fullAmtUp=b.movePOV.y,this._amtUpSoFar=0,this._fullAmtForward=b.movePOV.z,this._amtForwardSoFar=0,this._doingRotation||(this._positionStartVec=this._mesh.position,this._positionEndVec=this._positionStartVec.add(this._mesh.calcMovePOV(this._fullAmtRight,this._fullAmtUp,this._fullAmtForward)))),this._activeLockedCamera=null,this._doingRotation||this._doingMovePOV){var d=this._mesh.getScene().activeCamera;d.lockedTarget&&d.lockedTarget===this._mesh&&(this._activeLockedCamera=d)}},a.isSystemPaused=function(){return a._systemPaused},a.pauseSystem=function(){a._systemPaused=!0},a.resumeSystem=function(){a._systemPaused=!1,a._systemResumeTime=BABYLON.Tools.Now},a.prototype.isPaused=function(){return this._instancePaused},a.prototype.pausePlay=function(){this._instancePaused=!0},a.prototype.resumePlay=function(){this._lastResumeTime=BABYLON.Tools.Now,this._instancePaused=!1,null!==this._currentStepInSeries&&this._currentStepInSeries.resumePlay()},Object.defineProperty(a,"Version",{get:function(){return"1.0.0"},enumerable:!0,configurable:!0}),a.MAX_MILLIS_FOR_EVENT_LATE_START=50,a.CHANGED_TABS_THRESHOLD=200,a._systemResumeTime=0,a._systemPaused=!1,a}();a.BeforeRenderer=b}(POV||(POV={}));