/*
 * SPDX-FileCopyrightText: 2026 The BCR Contributors
 * SPDX-License-Identifier: GPL-3.0-only
 */

package com.chiller3.bcr.output

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test
import java.time.Instant
import java.time.LocalDate
import java.time.ZonedDateTime

class OutputFilenameGeneratorTest {
    @Test
    fun testParseTimestampRejectsMalformedInput() {
        val formatter = OutputFilenameGenerator.dateFormatter("uuuuMMdd")

        assertNull(OutputFilenameGenerator.parseTimestamp(formatter, "not-a-date"))
        assertNull(OutputFilenameGenerator.parseTimestamp(formatter, "prefix-not-a-date", 7))
    }

    @Test
    fun testParseTimestampWithOffset() {
        val formatter = OutputFilenameGenerator.dateFormatter("uuuuMMdd_HHmmss.SSSxx")
        val expected = ZonedDateTime.parse("2026-07-31T17:30:45.123-07:00")
        val formatted = formatter.format(expected)

        assertEquals(
            expected,
            OutputFilenameGenerator.parseTimestamp(formatter, formatted),
        )
    }

    @Test
    fun testParseTimestampWithLocalDate() {
        val formatter = OutputFilenameGenerator.dateFormatter("uuuu-MM-dd")
        val expected = LocalDate.of(2026, 7, 31).atStartOfDay()

        assertEquals(
            expected,
            OutputFilenameGenerator.parseTimestamp(formatter, "2026-07-31"),
        )
    }

    @Test
    fun testParseUnixSeconds() {
        val formatter = OutputFilenameGenerator.dateFormatter("unix_s")
        val expected = Instant.parse("2026-07-31T17:30:45Z")
        val formatted = formatter.format(expected)

        assertEquals(
            expected,
            OutputFilenameGenerator.parseTimestamp(formatter, formatted),
        )
    }

    @Test
    fun testParseUnixMilliseconds() {
        val formatter = OutputFilenameGenerator.dateFormatter("unix_ms")
        val expected = Instant.parse("2026-07-31T17:30:45.123Z")
        val formatted = formatter.format(expected)

        assertEquals(
            expected,
            OutputFilenameGenerator.parseTimestamp(formatter, formatted),
        )
    }
}
