# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> /case-studies has no horizontal overflow
- Location: tests/e2e/visual.spec.ts:14:7

# Error details

```
Error: Channel closed
```

```
Error: page.evaluate: Target page, context or browser has been closed
```

```
Error: browserContext.close: Test ended.
Browser logs:

<launching> /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,BlockOriginHeaderModificationOnRedirect,Translate,AutoDeElevate,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --disable-updater-scheduler --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=/var/folders/88/9crpzlrx3wd0vvpq2kqn3ks40000gn/T/playwright_chromiumdev_profile-zv1zBZ --remote-debugging-pipe --no-startup-window
<launched> pid=25970
[pid=25970][err] [25970:247918:0921/012046.638146:ERROR:net/cert/internal/trust_store_mac.cc:807] Error parsing certificate:
[pid=25970][err] ERROR: Failed parsing extensions
[pid=25970][err] 
[pid=25970][err] [25976:247929:0921/012047.568215:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012047.568929:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012047.569089:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012047.569684:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012047.569751:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012047.569858:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012047.570315:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012047.570386:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012047.570486:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012050.280132:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012050.282950:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012050.283218:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012050.284006:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012050.284179:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012050.284460:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012050.284924:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012050.285017:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012050.285186:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012052.535030:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012052.535129:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012052.535285:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012052.535784:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012052.535871:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012052.536008:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012052.536383:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012052.536469:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012052.536630:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012055.944349:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012055.944450:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012055.944568:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012055.944980:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012055.945049:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012055.945142:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012055.945432:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012055.945496:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012055.945601:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012058.384470:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012058.384565:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012058.384675:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012058.384996:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012058.385079:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012058.385191:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012058.385467:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012058.385525:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012058.385618:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012059.650212:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012059.650329:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012059.650478:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012100.821705:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012100.821937:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012100.822194:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012100.919768:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012100.992672:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012100.992925:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012100.999610:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012101.002847:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012101.003229:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012102.482104:ERROR:gpu/command_buffer/service/shared_image/shared_image_manager.cc:370] SharedImageManager::ProduceOverlay: Trying to Produce a Overlay representation from a non-existent mailbox.
[pid=25970][err] [25976:247929:0921/012102.482142:ERROR:components/viz/service/display_embedder/skia_output_device_buffer_queue.cc:258] Invalid mailbox.
[pid=25970][err] [25976:247929:0921/012102.822000:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012102.822115:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012102.822271:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012102.822714:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012102.822805:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012102.822913:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:247929:0921/012102.823171:ERROR:ui/gl/egl_util.cc:92] EGL Driver message (Error) eglQueryDeviceAttribEXT: Bad attribute.
[pid=25970][err] [25976:247929:0921/012102.823231:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970][err] [25976:248013:0921/012102.823305:ERROR:ui/display/mac/cv_display_link_mac.mm:194] CVDisplayLinkCreateWithCGDisplay failed. CVReturn: -6670
[pid=25970] <gracefully close start>
[pid=25970] <forcefully close>
[pid=25970] <kill>
[pid=25970] <will force kill>
```