package com.interconnected_mobile_client;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class HeartbeatModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "Heartbeat";
    private static ReactApplicationContext reactContext;

    public HeartbeatModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        HeartbeatModule.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService() {
        reactContext.startService(new Intent(reactContext, HeartbeatService.class));
    }

    @ReactMethod
    public void isServiceRunning(Promise promise) {
        ActivityManager manager = (ActivityManager) reactContext.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (HeartbeatService.class.getName().equals(service.service.getClassName())) {
                promise.resolve(true);
            }
        }
        promise.resolve(false);
    }

    @ReactMethod
    public void stopService() {
        reactContext.stopService(new Intent(reactContext, HeartbeatService.class));
    }
}
