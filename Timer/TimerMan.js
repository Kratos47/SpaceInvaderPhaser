/**
 * @file TimerMan.js
 * @description Manages a timeline of TimeEvents, firing them when their triggerTime is reached.
 */
import { Manager } from "../Manager/Manager.js";
import { TimeEvent } from "./TimeEvent.js";

export class TimerMan extends Manager {
    static pInstance = null;

    constructor(reserveNum = 3, reserveGrow = 1) {
        super();
        this.baseInitialize(reserveNum, reserveGrow);
        this.poNodeCompare = new TimeEvent();
        this.mCurrTime = 0.0;
    }

    static Create(reserveNum = 3, reserveGrow = 1) {
        if (TimerMan.pInstance === null) {
            TimerMan.pInstance = new TimerMan(reserveNum, reserveGrow);
        }
    }

    static Add(timeName, pCommand, deltaTimeToTrigger) {
        const pMan = TimerMan.privGetInstance();
        
        if (pMan.poReserve === null) {
            pMan.privFillReservedPool(pMan.mDeltaGrow);
        }
        
        const pNode = Manager.privPullFromFront(pMan, Manager.RESERVE);
        pNode.Wash(); 
        pNode.Set(timeName, pCommand, deltaTimeToTrigger);

        pMan.mNumActive++;
        pMan.mNumReserved--;

        const pHead = pMan.baseGetActive();
        const pNewHead = pMan.SortedInsert(pNode, pHead);

        pMan.baseSetActive(pNewHead);
        return pNode;
    }

    /**
     * Inserts an event into the active timeline sorted by triggerTime.
     */
    SortedInsert(pNode, pHead) {
        if (pHead === null || pNode.triggerTime < pHead.triggerTime) {
            pNode.pNext = pHead;
            if (pHead) pHead.pPrev = pNode;
            return pNode;
        }

        let curr = pHead;
        while (curr.pNext !== null && curr.pNext.triggerTime <= pNode.triggerTime) {
            curr = curr.pNext;
        }

        pNode.pNext = curr.pNext;
        pNode.pPrev = curr;
        if (curr.pNext) curr.pNext.pPrev = pNode;
        curr.pNext = pNode;

        return pHead;
    }

    static Update(totalTime) {
        const pMan = TimerMan.privGetInstance();
        pMan.mCurrTime = totalTime;

        let pEvent = pMan.baseGetActive();
        let pNextEvent = null;

        while (pEvent !== null && pMan.mCurrTime >= pEvent.triggerTime) {
            pNextEvent = pEvent.pNext;
            pEvent.Process();
            pMan.baseRemove(pEvent);
            pEvent = pNextEvent;
        }
    }

    static GetCurrTime() {
        return TimerMan.privGetInstance().mCurrTime;
    }

    // --- Manager Overrides ---
    derivedCreateNode() { return new TimeEvent(); }
    derivedCompare(pA, pB) { return pA.name === pB.name; }
    derivedWash(pLink) { pLink.Wash(); }
    derivedDumpNode(pLink) { pLink.Dump(); }

    static privGetInstance() {
        console.assert(TimerMan.pInstance !== null);
        return TimerMan.pInstance;
    }
}