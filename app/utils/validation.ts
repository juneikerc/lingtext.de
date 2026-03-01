/**

 * Client-side validation utilities for UX and performance

 *

 * IMPORTANT SECURITY NOTE:

 * These validations run in the browser and can be bypassed by users.

 * They are NOT security measures - only UX helpers for better user experience.

 *

 * Since this app stores data locally in IndexedDB and only sends text to

 * the /translate endpoint (which has its own server-side validation),

 * client-side "security" validation is not meaningful.

 */

export interface ValidationResult {
  isValid: boolean;

  error?: string;

  warnings?: string[];
}

/**
  
   * Validates text content for UX and performance issues (client-side only)
  
   * Note: This is NOT a security measure since it runs in the browser
  
   */

export function validateTextContent(
  content: string,
  filename?: string
): ValidationResult {
  const warnings: string[] = [];

  // Check if content is empty

  if (!content || content.trim().length === 0) {
    return {
      isValid: false,

      error: "Die Datei ist leer oder enthaelt keinen gueltigen Text.",
    };
  }

  // Check file size for performance (5MB limit)

  const maxSize = 5 * 1024 * 1024; // 5MB

  const contentSize = new Blob([content]).size;

  if (contentSize > maxSize) {
    return {
      isValid: false,

      error: `Die Datei ist zu gross (${(contentSize / 1024 / 1024).toFixed(2)}MB). Maximal erlaubt: 5MB fuer bessere Performance.`,
    };
  }

  // Check for excessive HTML tags (UX warning)

  const htmlTagCount = (content.match(/<[^>]+>/g) || []).length;

  const totalLines = content.split("\n").length;

  if (htmlTagCount > totalLines * 0.1) {
    warnings.push(
      "Die Datei enthaelt viele HTML-Tags. Der Reader funktioniert am besten mit Klartext."
    );
  }

  // Check for very long lines (performance warning)

  const lines = content.split("\n");

  const longLines = lines.filter((line) => line.length > 1000);

  if (longLines.length > 0) {
    warnings.push(
      `${longLines.length} sehr lange Zeile(n) erkannt. Das kann die Lese-Performance beeintraechtigen.`
    );
  }

  // Check encoding issues (UX warning)

  const encodingIssues = [
    /\u00c3\u00a1|\u00c3\u00a9|\u00c3\u00ad|\u00c3\u00b3|\u00c3\u00ba/g, // Common UTF-8 mojibake

    /â€™|â€œ|â€/g, // Smart quotes mojibake
  ];

  for (const pattern of encodingIssues) {
    if (pattern.test(content)) {
      warnings.push(
        "Moegliche Kodierungsprobleme erkannt. Bitte pruefe, ob die Datei UTF-8 verwendet."
      );

      break;
    }
  }

  return {
    isValid: true,

    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
  
   * Validates and sanitizes title input
  
   */

export function validateTitle(title: string): ValidationResult {
  if (!title || title.trim().length === 0) {
    return {
      isValid: false,

      error: "Der Titel darf nicht leer sein.",
    };
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length > 200) {
    return {
      isValid: false,

      error: "Der Titel darf nicht mehr als 200 Zeichen haben.",
    };
  }

  // Check for suspicious characters

  const suspiciousChars = /[<>\"'&]/;

  if (suspiciousChars.test(trimmedTitle)) {
    return {
      isValid: false,

      error: "Der Titel enthaelt nicht erlaubte Zeichen.",
    };
  }

  return { isValid: true };
}

/**
  
   * Sanitizes text content for storage and safe rendering with React.
  
   * We do NOT escape entities or strip tags here because we never inject raw HTML.
  
   * React escapes text nodes automatically, and our renderers tokenize and output
  
   * spans safely. Over-escaping breaks words like I'm / I'd.
  
   */

export function sanitizeTextContent(content: string): string {
  return (
    content

      // Remove null bytes and other control characters

      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")

      // Normalize line breaks

      .replace(/\r\n/g, "\n")

      .replace(/\r/g, "\n")
  );
}

/**
  
   * Validates file type and extension (UX helper, not security)
  
   * Note: This validation can be bypassed by users, it's only for better UX
  
   */

export function validateFileType(
  file: File,
  allowedTypes: string[] = ["text/plain"]
): ValidationResult {
  const warnings: string[] = [];

  // Check file extension (UX guidance)

  const fileName = file.name.toLowerCase();

  const textExtensions = [".txt", ".text"];

  const hasTextExtension = textExtensions.some((ext) => fileName.endsWith(ext));

  if (!hasTextExtension) {
    warnings.push(
      `Datei mit ungewoehnlicher Endung erkannt. Fuer bessere Kompatibilitaet werden .txt-Dateien empfohlen.`
    );
  }

  // Check file size for performance

  const maxSize = 10 * 1024 * 1024; // 10MB

  if (file.size > maxSize) {
    return {
      isValid: false,

      error: `Datei zu gross (${(file.size / 1024 / 1024).toFixed(2)}MB). Empfohlenes Maximum: 10MB fuer bessere Performance.`,
    };
  }

  return {
    isValid: true,

    warnings: warnings.length > 0 ? warnings : undefined,
  };
}
