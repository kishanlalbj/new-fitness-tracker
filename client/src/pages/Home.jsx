import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import MeasurementForm from "../components/MeasurementForm";
import StatCard from "../components/StatCard";
import Card from "../components/ui/Card";
import Chart from "../components/Chart";
import usePrivateApi from "../hooks/usePrivateApi";

const Home = () => {
  const privateAPI = usePrivateApi();

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({});

  const handleSaveStat = async (stat) => {
    try {
      setLoading(true);
      const res = await privateAPI.post("/api/v1/health-stats", stat);

      setStats((prev) => [...prev, res.data.result]);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      const res = await privateAPI.get("/api/v1/health-stats");
      setStats(res.data.result);
    };

    const fetchProfile = async () => {
      const res = await privateAPI.get("/api/v1/auth/profile");
      setProfile(res.data.result);
    };

    fetchStats();
    fetchProfile();
  }, [loading]);

  return (
    <div>
      <div className="grid grid-cols-[300px,1fr] gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <Profile {...profile} />
          </div>

          <div>
            <MeasurementForm
              onSubmit={handleSaveStat}
              loading={loading}
              error={error}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              title={"Body Mass Index"}
              value={stats[stats.length - 1]?.bmi}
            ></StatCard>
            <StatCard
              title={"Body Fat"}
              value={`${stats[stats.length - 1]?.bodyFat} %`}
            ></StatCard>

            <StatCard
              title={"Body Metabolic Rate"}
              value={stats[stats.length - 1]?.bmr}
            ></StatCard>
          </div>

          <div className="flex items-center gap-4">
            <Card className="w-full">
              <h1 className="text-xl font-bold text-center">Trends</h1>
              <Chart data={stats} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
