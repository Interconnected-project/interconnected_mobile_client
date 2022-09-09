package com.interconnected_mobile_client;

import android.content.Intent;
import android.os.Bundle;
import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.jstasks.LinearCountingRetryPolicy;

public class HeartbeatEventService extends HeadlessJsTaskService {
    @Nullable
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {

        LinearCountingRetryPolicy retryPolicy = new LinearCountingRetryPolicy(
                Integer.MAX_VALUE, // Max number of retry attempts
                2000 // Delay between each retry attempt
        );

        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig(
                "Heartbeat",
                extras != null ? Arguments.fromBundle(extras) : Arguments.createMap(),
                5000,
                true,
                retryPolicy);
    }
}
