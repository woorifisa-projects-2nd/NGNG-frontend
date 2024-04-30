import "cypress-file-upload";
describe("상품 등록 테스트", () => {
  it("상품 정보 입력 전 업로드 버튼 비활성화", () => {
    cy.visit("http://localhost:3000/sell");
    cy.get("[data-cy='product-upload-button']").should("be.disabled");
    cy.get("[data-cy='image-upload-input']").attachFile("고양이방석.jpg");
    cy.get("[data-cy='product-name']").type("고양이 방석");
    cy.get("[data-cy='category-dropdown']").click();
    cy.get("[data-cy='category-1']").click();
    cy.get("[data-cy='radio-1']").check();
    cy.get("[data-cy='radio-true']").check();
    // 글자 입력
    cy.get("[data-cy='product-price']").type("ㄱ").should("have.value", "");
    // 숫자 입력
    cy.get("[data-cy='product-price']")
      .type("10000")
      .should("have.value", "10,000");
    cy.get("[data-cy='product-description']").type("고양이 방석입니다.");
    cy.get("[data-cy='product-upload-button']").should("be.enabled");
    cy.get("[data-cy='product-upload-button']").click();
  });
});
