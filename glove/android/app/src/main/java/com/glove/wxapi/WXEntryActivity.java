package com.glove.wxapi;

/**
 * Created by mfhj-dz-001-424 on 16/12/14.
 */

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.heng.wechat.WeChatModule;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.modelmsg.SendAuth;
import com.tencent.mm.sdk.modelmsg.SendMessageToWX;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler {

    Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = this;
        WeChatModule.wxApi.handleIntent(getIntent(), this);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        WeChatModule.wxApi.handleIntent(intent, this);
    }

    @Override
    public void onReq(BaseReq baseReq) {

    }

    @Override
    public void onResp(BaseResp baseResp) {
        // 下面@所标记的地方key值可以根据需要自行更改,对应你js文件中的key即可
        int errCode = baseResp.errCode;
        WritableMap params = Arguments.createMap();
        params.putInt("errCode", errCode);
        String eventName = null;
        switch (errCode) {
            case BaseResp.ErrCode.ERR_OK:
                params.putBoolean("success", true);                 // @
                if (baseResp instanceof SendAuth.Resp) {
                    String code = ((SendAuth.Resp) baseResp).code;
                    String state = ((SendAuth.Resp) baseResp).state;
                    params.putString("code", code);                 // @
                    params.putString("state", state);               // @
                    eventName = "finishedAuth";                     // @
                } else if (baseResp instanceof SendMessageToWX.Resp){
                    eventName = "finishedShare";                    // @
                }
                break;
            default:
                //其他情况
                params.putBoolean("success", false);                // @
                break;
        }
        WeChatModule.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
        finish();
    }
}
