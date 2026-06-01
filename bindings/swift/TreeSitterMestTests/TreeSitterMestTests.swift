import XCTest
import SwiftTreeSitter
import TreeSitterMest

final class TreeSitterMestTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_mest())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Mest grammar")
    }
}
