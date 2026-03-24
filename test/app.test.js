const { work } = require("../controller/home.controller");
//Testing

describe("Work Flow", () => {
  test("server is working properly", () => {
    // Arrange
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Act
    work(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Server Working",
    });
  });
});
