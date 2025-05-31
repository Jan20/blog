<!--
date=2025-05-31
topic=Efficiency
summary=Provides a gently introduction into configuring MacOS.
-->

# Efficient MacOS Setup

In this guide, we’ll walk through a few key settings to tweak when setting up a new Mac. Our goal is to configure the system to support productivity in an efficient, streamlined way—without adding unnecessary overhead. Hitting that sweet spot can be trickier than expected. It’s easy to fall down the rabbit hole of tinkering with tools that promise increased productivity, only to find that each comes with a learning curve, potential long-term maintenance issues, or essential features locked behind a paywall.

To avoid those traps, we’ll stick to the fundamentals—primarily focusing on system settings. Let’s dive in.


**Step 1:** As we’re aiming for a clean, distraction-free user interface and optimal speed, there’s no need to constantly display the menu bar or the Dock.

* To hide the Dock: **Right-click** (or Control-click) on the Dock and select **Turn Hiding On**.
* To hide the menu bar: Open **System Settings** → **Control Center**, then set “Automatically hide and show the menu bar” to **“Always”**.


![Step 1](assets/posts/engineering/efficient-mac-os-setup/hide_menu_bar.png)

**Step 2:** Next, we’ll set up a few shortcuts to quickly switch between the four or five applications we use most frequently. To do this, we can use macOS’s built-in **Automator** app. While Automator isn’t the most elegant tool, it gets the job done without requiring any third-party installations.

```TS
open -a Automator
```

**Step 3:** After opening Automator, choose **“Quick Action”** as the type of document to create your new workflow.

![Step 3](assets/posts/engineering/efficient-mac-os-setup/automator_1.png)

**Step 4:**  In the Actions library, search for **“Run AppleScript”**, then drag it into the workflow area.

![Step 4](assets/posts/engineering/efficient-mac-os-setup/automator_2.png)

**Step 5:** Write a script to open macOS’s built-in Terminal app, then save the Quick Action as “Open Terminal”. AppleScript syntax can feel a bit unusual at first, but the core idea here is simple: we want to tell the specified application—in this case, Terminal—to launch and become the active (focused) window.

```TS
tell application "Terminal"
    activate
end tell
```
![Step 5](assets/posts/engineering/efficient-mac-os-setup/automator_3.png)

**Step 6:**  Next, we’ll assign a keyboard shortcut to trigger the newly created AppleScript. Open the macOS **System Settings** app, search for **Keyboard**, and select **Keyboard Shortcuts**. From there, you can assign a custom shortcut to your Quick Action.

![Step 6](assets/posts/engineering/efficient-mac-os-setup/automator_4.png)

**Step 7:**  Finally, in the left-hand panel, select App Shortcuts, then click the “+” button to add a new shortcut. Make sure to enter the exact name of your Quick Action **“Open Terminal”** in this case—as the menu title. The name must match exactly for the shortcut to work properly.

![Step 7](assets/posts/engineering/efficient-mac-os-setup/automator_5.png)

## Summary
In this guide, we streamlined our macOS setup for improved focus and efficiency:

1. Cleaned Up the Interface: We hid the Dock and menu bar to reduce visual clutter and create a distraction-free workspace.
2.	Created Quick App Shortcuts: Using Automator, we built Quick Actions that launch frequently used apps like Terminal.
3.	Assigned Keyboard Shortcuts: Through System Settings, we mapped custom keyboard shortcuts to our Quick Actions, enabling fast access to our essential tools.

The next natural step is to configure our Terminal for peak efficiency. For doing so, please checkout the [Efficient Terminal Setup](https://janladicha.de/engineering/efficient-terminal-setup) guide.