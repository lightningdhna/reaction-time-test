import tkinter as tk
from time import time
import random
from threading import Timer


class ClickTimerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Reaction Time Tester")
        self.root.geometry("300x200")  # Adjust size as needed

        self.main_frame = tk.Frame(root, bg="red")
        self.main_frame.pack(expand=True, fill=tk.BOTH)

        self.start_time = 0
        self.total_time = 0
        self.counter = 0

        # Bind left mouse click and Enter key
        self.main_frame.bind("<Button-1>", self.record_reaction)
        self.root.bind("<Return>", self.record_reaction)  # Bind Enter key
        self.root.bind("<space>", self.record_reaction)  # Correctly bind space key

        self.time_display = tk.Label(self.main_frame, text="Wait for green", bg="red")
        self.time_display.pack(pady=20)

        self.avg_time_display = tk.Label(
            self.main_frame, text="Average time: N/A", bg="red"
        )
        self.avg_time_display.pack(side="left", padx=10)  # Display on the left side

        self.schedule_color_change()

    def schedule_color_change(self):
        delay = random.uniform(1, 9)  
        Timer(delay, self.change_to_green).start()

    def change_to_green(self):
        self.main_frame.config(bg="green")
        # self.time_display.config(text="Click now!", bg="green")
        self.start_time = time()

    def record_reaction(self, event):
        if self.start_time:  # Ensures that a reaction time measurement is ongoing
            reaction_time = (time() - self.start_time) * 1000  # Convert to milliseconds
            self.total_time += reaction_time
            self.counter += 1  # Increment counter
            avg_reaction_time = self.total_time / self.counter  # Calculate average

            self.time_display.config(
                text=f"Reaction time: {reaction_time:.2f} ms", bg="red"
            )
            self.avg_time_display.config(
                text=f"Average time: {avg_reaction_time:.2f} ms", bg="red"
            )  # Update average display

            self.main_frame.config(bg="red")
            self.start_time = 0  # Reset start time
            self.schedule_color_change()  # Prepare for the next test


if __name__ == "__main__":
    root = tk.Tk()
    app = ClickTimerApp(root)
    root.mainloop()
