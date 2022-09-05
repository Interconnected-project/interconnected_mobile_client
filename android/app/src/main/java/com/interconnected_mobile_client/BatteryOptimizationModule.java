package com.interconnected_mobile_client;

import static android.content.Context.POWER_SERVICE;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BatteryOptimizationModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public BatteryOptimizationModule(ReactApplicationContext reactContext){
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "BatteryOptimizationModule";
    }

    @ReactMethod
    public void isBatteryOptimizationAvailable(Promise promise){
        promise.resolve(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M);
    }

    @ReactMethod
    public void isBatteryOptimizationCurrentlyActive(Promise promise){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
            String packageName = reactContext.getPackageName();
            PowerManager pm = (PowerManager) reactContext.getSystemService(POWER_SERVICE);
            promise.resolve(!pm.isIgnoringBatteryOptimizations(packageName));
        }
        promise.resolve(false);
    }

    @ReactMethod
    public void openBatteryOptimizationSettings(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Intent intent = new Intent();
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            String packageName = reactContext.getPackageName();
            PowerManager pm = (PowerManager) reactContext.getSystemService(POWER_SERVICE);
            if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + packageName));
                reactContext.startActivity(intent);
            }
        }
    }
}
