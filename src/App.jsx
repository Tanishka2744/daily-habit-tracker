import { useState } from "react";
import "./App.css";

const initialHabits = [
  {
    id: 1,
    title: "Drink 8 glasses of water",
    icon: "💧",
    completed: false,
  },
  {
    id: 2,
    title: "Read for 20 minutes",
    icon: "📚",
    completed: true,
  },
  {
    id: 3,
    title: "Exercise for 30 minutes",
    icon: "🏃",
    completed: false,
  },
  {
    id: 4,
    title: "Practice coding",
    icon: "💻",
    completed: false,
  },
];

const icons = ["✨", "🎯", "🧘", "✍️", "🌱", "🎨"];

function App() {
  const [habits, setHabits] = useState(initialHabits);
  const [newHabit, setNewHabit] = useState("");
  const completedCount = habits.filter((habit) => habit.completed).length;

  const progress =
    habits.length === 0
      ? 0
      : Math.round((completedCount / habits.length) * 100);
  const addHabit = (e) => {
    e.preventDefault();
    const title = newHabit.trim();
    if (!title) return;
    const habit = {
      id: Date.now(),
      title,
      icon: icons[Math.floor(Math.random() * icons.length)],
      completed: false,
    };
    setHabits((prevHabits) => [...prevHabits, habit]);
    setNewHabit("");
  };

  const toggleHabit = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit,
      ),
    );
  };

  const deleteHabit = (id) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  return (
    <main className="app">
      <header className="topbar">
        <a href="#home" className="brand" id="home">
          <span className="brand-icon">✦</span>
          <span>Habitly</span>
        </a>

        <span className="today-badge">
          <span className="status-dot"></span>
          Your daily space
        </span>
      </header>

      <section className="dashboard">
        <div className="welcome">
          <p className="eyebrow">YOUR PERSONAL GROWTH SPACE</p>
          <h1>
            Small steps,
            <br />
            <span>big changes.</span>
          </h1>
          <p className="subtitle">
            Build better habits, one day at a time. You've got this!
          </p>
        </div>

        <section className="progress-card">
          <div className="progress-top">
            <div>
              <p className="card-label">DAILY PROGRESS</p>
              <h2>
                {progress}% <span>completed</span>
              </h2>
            </div>
            <div className="progress-icon">🎯</div>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Daily habit completion"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="progress-caption">
            {habits.length === 0
              ? "Add your first habit to get started!"
              : completedCount === habits.length
                ? "Amazing! You've completed every habit today! 🎉"
                : `${completedCount} of ${habits.length} habits completed. Keep going!`}
          </p>
        </section>

        <section className="habits-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MAKE TODAY COUNT</p>
              <h2>
                My daily habits <span>✦</span>
              </h2>
            </div>
            <span className="habit-count">
              {habits.length} {habits.length === 1 ? "habit" : "habits"}
            </span>
          </div>

          <form className="add-form" onSubmit={addHabit}>
            <span className="input-icon">＋</span>
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Add a new habit..."
              aria-label="New habit name"
              maxLength={80}
            />
            <button type="submit" className="add-button">
              <span>+</span> Add habit
            </button>
          </form>

          <div className="habit-list">
            {habits.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🌱</div>
                <h3>A fresh start!</h3>
                <p>Add your first habit and start building a better routine.</p>
              </div>
            ) : (
              habits.map((habit) => (
                <article
                  className={`habit-item ${
                    habit.completed ? "is-completed" : ""
                  }`}
                  key={habit.id}
                >
                  <button
                    type="button"
                    className={`check-button ${
                      habit.completed ? "checked" : ""
                    }`}
                    onClick={() => toggleHabit(habit.id)}
                    aria-label={
                      habit.completed
                        ? `Mark ${habit.title} incomplete`
                        : `Mark ${habit.title} complete`
                    }
                    aria-pressed={habit.completed}
                  >
                    {habit.completed && "✓"}
                  </button>

                  <span className="habit-icon">{habit.icon}</span>

                  <span className="habit-title">
                    {habit.title}
                    <small>
                      {habit.completed ? "Completed today" : "Keep it up!"}
                    </small>
                  </span>

                  {habit.completed && <span className="done-label">Done</span>}

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteHabit(habit.id)}
                    aria-label={`Delete ${habit.title}`}
                    title="Delete habit"
                  >
                    ×
                  </button>
                </article>
              ))
            )}
          </div>
        </section>

        <footer className="footer">
          <span>✦</span> Progress, not perfection.
          <span className="footer-note">Made for your best self 💜</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
