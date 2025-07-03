import AppLayout from "@/components/layout/AppLayout";

const placeholderStyles = `
.placeholder-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
}

.placeholder-content {
  text-align: center;
}

.placeholder-title {
  font-size: 24px;
  font-weight: bold;
  color: #fafafa;
  margin-bottom: 16px;
}

.placeholder-text {
  color: #8b8b8b;
  font-size: 16px;
}
  .highlighted-text{
    color: rgb(255, 89, 0);
    font-weight: bold;
  }
`;

export default function Index() {
  return (
    <>
      <style>{placeholderStyles}</style>
      <AppLayout>
        <div className="placeholder-container">
          <div className="placeholder-content">
            <h1 className="placeholder-title">
              Welcome to <span className="highlighted-text">GPU.NET</span>
            </h1>
            <p className="placeholder-text">Planetary Grid of Compute</p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
